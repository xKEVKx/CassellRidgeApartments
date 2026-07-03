import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";
import fs from "fs";

const app = express();
app.set('trust proxy', 1);

app.use((req, res, next) => {
  res.setHeader('X-Robots-Tag', 'index, follow');
  next();
});

app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://acsbapp.com https://replit.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com https://acsbapp.com",
      "font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com https://acsbapp.com",
      "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com https://acsbapp.com https://*.matterport.com",
      "frame-src 'self' https://www.portal.fortresstech.io https://discover.matterport.com https://www.google.com https://my.matterport.com",
      "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://acsbapp.com https://region1.google-analytics.com",
      "media-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; ')
  );
  next();
});

app.use(express.json({ limit: '6mb' }));
app.use(express.urlencoded({ extended: false, limit: '6mb' }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Known valid SPA routes — everything else returns 404 in production
const VALID_SPA_ROUTES = new Set([
  '/',
  '/floor-plans',
  '/gallery',
  '/community',
  '/location',
  '/virtual-tours',
  '/contact',
  '/admin',
]);

interface RoutePrerender {
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  bodyHtml: string;
}

// Per-route prerender data: meta tags + visible body HTML for non-JS crawlers.
// React replaces bodyHtml on mount; crawlers that skip JS read it directly.
const ROUTE_PRERENDER: Record<string, RoutePrerender> = {
  '/': {
    title: 'Cassell Ridge Apartments | LIHTC Affordable Housing - Knoxville, TN',
    description: 'Discover affordable LIHTC apartments at Cassell Ridge in Knoxville, TN. Spacious 2 & 3 bedroom homes with modern amenities and income-based rents starting at $950.',
    canonical: 'https://www.cassellridgeapts.com/',
    ogTitle: 'Cassell Ridge Apartments | LIHTC Affordable Housing - Knoxville, TN',
    ogDescription: 'Discover affordable LIHTC apartments at Cassell Ridge in Knoxville, TN. Spacious 2 & 3 bedroom homes with modern amenities and income-based rents starting at $950.',
    bodyHtml: `
<main>
  <section aria-label="Hero">
    <h1>Cassell Ridge Apartments &mdash; Affordable LIHTC Housing in Knoxville, TN</h1>
    <p>Quality affordable housing approved under the Low-Income Housing Tax Credit (LIHTC) program. Spacious 2 and 3 bedroom apartment homes with modern amenities in Knoxville, Tennessee.</p>
    <p>Income-based rents starting at $950 per month. Income limits apply.</p>
  </section>
  <section aria-label="Floor Plans Overview">
    <h2>2 &amp; 3 Bedroom Apartment Homes</h2>
    <p>Choose from spacious floor plans featuring open kitchens, generous closet space, in-unit washer/dryer connections, and private patios or balconies.</p>
  </section>
  <section aria-label="Community Amenities">
    <h2>Community Amenities</h2>
    <ul>
      <li>Resort-style swimming pool</li>
      <li>Fitness center</li>
      <li>Pet-friendly community</li>
      <li>On-site laundry facilities</li>
      <li>Professional on-site management</li>
    </ul>
  </section>
  <section aria-label="Income Limits and Eligibility" id="eligibility">
    <h2>Income Limits &amp; Eligibility</h2>
    <p>Cassell Ridge Apartments participates in the LIHTC affordable housing program. To qualify, your household income must fall at or below the program limit for your household size.</p>
    <table>
      <caption>2025 Income Limits by Household Size</caption>
      <thead><tr><th>Household Size</th><th>Annual Income Limit</th></tr></thead>
      <tbody>
        <tr><td>1 Person</td><td>$43,560</td></tr>
        <tr><td>2 People</td><td>$49,800</td></tr>
        <tr><td>3 People</td><td>$56,040</td></tr>
        <tr><td>4 People</td><td>$62,220</td></tr>
        <tr><td>5 People</td><td>$67,200</td></tr>
        <tr><td>6 People</td><td>$72,180</td></tr>
        <tr><td>7 People</td><td>$77,160</td></tr>
        <tr><td>8 People</td><td>$82,140</td></tr>
      </tbody>
    </table>
  </section>
  <section aria-label="Contact">
    <h2>Schedule a Tour</h2>
    <p>Cassell Ridge Apartments &mdash; 1230 Cassell Valley Way, Knoxville, TN</p>
    <p>Phone: (865) 357-2712 &mdash; Email: cassellridge@elmingtonpm.com</p>
  </section>
</main>`,
  },
  '/floor-plans': {
    title: 'Floor Plans | Cassell Ridge Apartments - Knoxville, TN',
    description: 'Explore 2 and 3 bedroom LIHTC apartment floor plans at Cassell Ridge in Knoxville, TN. View layouts, square footage, and schedule your visit today.',
    canonical: 'https://www.cassellridgeapts.com/floor-plans',
    ogTitle: 'Floor Plans | Cassell Ridge Apartments - Knoxville, TN',
    ogDescription: 'Explore 2 and 3 bedroom LIHTC apartment floor plans at Cassell Ridge in Knoxville, TN. View layouts, square footage, and schedule your visit today.',
    bodyHtml: `
<main>
  <section aria-label="Floor Plans">
    <h1>Apartment Floor Plans at Cassell Ridge</h1>
    <p>Comfortable floor plans with spacious kitchens, generous closets, and private patios or balconies. All units participate in the LIHTC affordable housing program.</p>
    <article>
      <h2>2 Bedroom / 2 Bathroom Apartments</h2>
      <p>Spacious two-bedroom, two-bathroom floor plans ideal for individuals, couples, or small families. Featuring open-concept living and dining areas, full kitchens, and private outdoor space.</p>
    </article>
    <article>
      <h2>3 Bedroom / 2 Bathroom Apartments</h2>
      <p>Generous three-bedroom, two-bathroom homes offering ample room for families. Features include a full kitchen, living area, washer/dryer connections, and a private patio or balcony.</p>
    </article>
    <p>To schedule a visit or learn more about current availability, contact us at (865) 357-2712 or cassellridge@elmingtonpm.com.</p>
  </section>
</main>`,
  },
  '/gallery': {
    title: 'Photo Gallery | Cassell Ridge Apartments - Knoxville, TN',
    description: 'Browse photos of Cassell Ridge Apartments in Knoxville, TN. View interior and exterior images of our affordable 2 & 3 bedroom LIHTC apartment homes.',
    canonical: 'https://www.cassellridgeapts.com/gallery',
    ogTitle: 'Photo Gallery | Cassell Ridge Apartments - Knoxville, TN',
    ogDescription: 'Browse photos of Cassell Ridge Apartments in Knoxville, TN. View interior and exterior images of our affordable 2 & 3 bedroom LIHTC apartment homes.',
    bodyHtml: `
<main>
  <section aria-label="Photo Gallery">
    <h1>Photo Gallery &mdash; Cassell Ridge Apartments</h1>
    <p>Explore interior and exterior photos of Cassell Ridge Apartments in Knoxville, Tennessee. Our gallery showcases the living spaces, community amenities, pool area, and landscaped grounds of our LIHTC affordable housing community.</p>
    <p>Browse images of:</p>
    <ul>
      <li>Apartment interiors &mdash; kitchens, living rooms, bedrooms</li>
      <li>Community common areas</li>
      <li>Resort-style swimming pool</li>
      <li>Exterior and landscaping</li>
    </ul>
    <p>Located at 1230 Cassell Valley Way, Knoxville, TN. Contact us at (865) 357-2712 to schedule a tour.</p>
  </section>
</main>`,
  },
  '/community': {
    title: 'Community | Cassell Ridge Apartments - Knoxville, TN',
    description: 'Discover what\'s near Cassell Ridge Apartments in North Knoxville, TN. Explore nearby neighborhoods, shopping, dining, schools, parks, and healthcare.',
    canonical: 'https://www.cassellridgeapts.com/community',
    ogTitle: 'Community | Cassell Ridge Apartments - Knoxville, TN',
    ogDescription: 'Discover what\'s near Cassell Ridge Apartments in North Knoxville, TN. Explore nearby neighborhoods, shopping, dining, schools, parks, and healthcare.',
    bodyHtml: `
<main>
  <section aria-label="Community Overview">
    <h1>Living Near Cassell Ridge Apartments in Knoxville, TN</h1>
    <p>Cassell Ridge Apartments is ideally situated in North Knoxville, Tennessee, offering residents convenient access to shopping, dining, schools, parks, and healthcare facilities.</p>
  </section>
  <section aria-label="Shopping and Dining">
    <h2>Shopping &amp; Dining</h2>
    <p>Residents enjoy easy access to major retailers, grocery stores, and a wide variety of local and national restaurants within a short drive of the community.</p>
  </section>
  <section aria-label="Schools">
    <h2>Nearby Schools</h2>
    <p>Cassell Ridge is served by Knox County Schools, with elementary, middle, and high schools within convenient distance of the community.</p>
  </section>
  <section aria-label="Parks and Recreation">
    <h2>Parks &amp; Recreation</h2>
    <p>The North Knoxville area offers numerous parks, greenways, and recreational facilities for residents of all ages to enjoy outdoor activities and nature.</p>
  </section>
  <section aria-label="Healthcare">
    <h2>Healthcare</h2>
    <p>Several hospitals, medical offices, and urgent care centers are located nearby, ensuring residents have convenient access to quality healthcare services.</p>
  </section>
  <section aria-label="Why Choose Cassell Ridge">
    <h2>Why Rent at Cassell Ridge Apartments?</h2>
    <ul>
      <li>LIHTC affordable housing with income-based rents</li>
      <li>Spacious 2 and 3 bedroom floor plans</li>
      <li>Resort-style amenities including pool and fitness center</li>
      <li>Professional on-site management</li>
      <li>Convenient North Knoxville location</li>
    </ul>
  </section>
</main>`,
  },
  '/location': {
    title: 'Location & Directions | Cassell Ridge Apartments - Knoxville, TN',
    description: 'Find Cassell Ridge Apartments at 1230 Cassell Valley Way, Knoxville, TN. Conveniently located with easy access to local amenities, schools, and transit.',
    canonical: 'https://www.cassellridgeapts.com/location',
    ogTitle: 'Location & Directions | Cassell Ridge Apartments - Knoxville, TN',
    ogDescription: 'Find Cassell Ridge Apartments at 1230 Cassell Valley Way, Knoxville, TN. Conveniently located with easy access to local amenities, schools, and transit.',
    bodyHtml: `
<main>
  <section aria-label="Location and Directions">
    <h1>Location &amp; Directions &mdash; Cassell Ridge Apartments</h1>
    <address>
      <strong>Cassell Ridge Apartments</strong><br />
      1230 Cassell Valley Way<br />
      Knoxville, TN 37912<br />
      Phone: <a href="tel:+18653572712">(865) 357-2712</a><br />
      Email: <a href="mailto:cassellridge@elmingtonpm.com">cassellridge@elmingtonpm.com</a>
    </address>
    <section aria-label="Office Hours">
      <h2>Office Hours</h2>
      <ul>
        <li>Monday &ndash; Friday: 8:00 AM &ndash; 5:00 PM</li>
        <li>Saturday: 10:00 AM &ndash; 2:00 PM</li>
        <li>Sunday: Closed</li>
      </ul>
    </section>
    <section aria-label="Getting Here">
      <h2>Getting Here</h2>
      <p>Cassell Ridge Apartments is conveniently located in North Knoxville with easy access to Interstate 75, major retail centers, schools, and public transit routes.</p>
    </section>
  </section>
</main>`,
  },
  '/virtual-tours': {
    title: 'Virtual Tours | Cassell Ridge Apartments - Knoxville, TN',
    description: 'Take a 3D virtual tour of Cassell Ridge Apartments in Knoxville, TN. Explore our spacious 2 and 3 bedroom LIHTC affordable apartment floor plans online.',
    canonical: 'https://www.cassellridgeapts.com/virtual-tours',
    ogTitle: 'Virtual Tours | Cassell Ridge Apartments - Knoxville, TN',
    ogDescription: 'Take a 3D virtual tour of Cassell Ridge Apartments in Knoxville, TN. Explore our spacious 2 and 3 bedroom LIHTC affordable apartment floor plans online.',
    bodyHtml: `
<main>
  <section aria-label="Virtual Tours">
    <h1>Virtual Tours &mdash; Cassell Ridge Apartments</h1>
    <p>Explore Cassell Ridge Apartments from the comfort of your own home with our interactive 3D virtual tours. Walk through our 2-bedroom and 3-bedroom apartment layouts using Matterport technology.</p>
    <article>
      <h2>2-Bedroom Virtual Tour</h2>
      <p>Take an immersive 3D walkthrough of our 2-bedroom apartment layout. Experience the spacious living areas, modern kitchen, and comfortable bedrooms. View the tour at <a href="https://discover.matterport.com/space/EQrEazqXEcw">Matterport: 2-Bedroom Tour</a>.</p>
    </article>
    <article>
      <h2>3-Bedroom Virtual Tour</h2>
      <p>Explore our spacious 3-bedroom apartment with this interactive virtual tour. See the generous living spaces and modern amenities up close. View the tour at <a href="https://discover.matterport.com/space/ZJ5VJ6eqLZk">Matterport: 3-Bedroom Tour</a>.</p>
    </article>
    <p>Ready to schedule an in-person visit? Contact us at (865) 357-2712.</p>
  </section>
</main>`,
  },
  '/contact': {
    title: 'Contact Us | Cassell Ridge Apartments - Knoxville, TN',
    description: 'Contact Cassell Ridge Apartments in Knoxville, TN to schedule a tour or ask about availability. Call (865) 357-2712 or fill out our online form today.',
    canonical: 'https://www.cassellridgeapts.com/contact',
    ogTitle: 'Contact Us | Cassell Ridge Apartments - Knoxville, TN',
    ogDescription: 'Contact Cassell Ridge Apartments in Knoxville, TN to schedule a tour or ask about availability. Call (865) 357-2712 or fill out our online form today.',
    bodyHtml: `
<main>
  <section aria-label="Contact Information">
    <h1>Contact Cassell Ridge Apartments</h1>
    <p>Ready to make Cassell Ridge Apartments your home? Reach out to our leasing team to schedule a tour or ask about current availability.</p>
    <address>
      <strong>Cassell Ridge Apartments</strong><br />
      1230 Cassell Valley Way, Knoxville, TN 37912<br />
      Phone: <a href="tel:+18653572712">(865) 357-2712</a><br />
      Email: <a href="mailto:cassellridge@elmingtonpm.com">cassellridge@elmingtonpm.com</a>
    </address>
    <section aria-label="Office Hours">
      <h2>Office Hours</h2>
      <ul>
        <li>Monday &ndash; Friday: 8:00 AM &ndash; 5:00 PM</li>
        <li>Saturday: 10:00 AM &ndash; 2:00 PM</li>
        <li>Sunday: Closed</li>
      </ul>
    </section>
    <p>You may also use our online contact form to send a message directly to our leasing office.</p>
  </section>
</main>`,
  },
};

function escapeAttr(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function applyPrerender(html: string, data: RoutePrerender): string {
  const safeTitle = data.title.replace(/</g, '&lt;').replace(/>/g, '&gt;');

  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${safeTitle}</title>`)
    .replace(
      /<meta name="description"[^>]*>/,
      `<meta name="description" content="${escapeAttr(data.description)}" />`
    )
    .replace(
      /<link rel="canonical"[^>]*>/,
      `<link rel="canonical" href="${escapeAttr(data.canonical)}" />`
    )
    .replace(
      /<meta property="og:title"[^>]*>/,
      `<meta property="og:title" content="${escapeAttr(data.ogTitle)}" />`
    )
    .replace(
      /<meta property="og:description"[^>]*>/,
      `<meta property="og:description" content="${escapeAttr(data.ogDescription)}" />`
    )
    .replace(
      /<meta property="og:url"[^>]*>/,
      `<meta property="og:url" content="${escapeAttr(data.canonical)}" />`
    )
    .replace(
      /<meta name="twitter:title"[^>]*>/,
      `<meta name="twitter:title" content="${escapeAttr(data.ogTitle)}" />`
    )
    .replace(
      /<meta name="twitter:description"[^>]*>/,
      `<meta name="twitter:description" content="${escapeAttr(data.ogDescription)}" />`
    )
    .replace(
      '<div id="root"></div>',
      `<div id="root">${data.bodyHtml}</div>`
    );
}

(async () => {
  const server = await registerRoutes(app);

  // Serve static files from public directory
  app.use(express.static(path.resolve(import.meta.dirname, '..', 'public')));

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    const distIndexPath = path.resolve(import.meta.dirname, 'public', 'index.html');

    // Cache the index.html content at startup to avoid repeated disk reads
    let indexHtmlTemplate: string | null = null;
    try {
      indexHtmlTemplate = fs.readFileSync(distIndexPath, 'utf-8');
    } catch {
      // Will be caught per-request below if not available
    }

    // Pre-generate per-route HTML from the index template and cache it
    const prerenderCache: Map<string, string> = new Map();
    if (indexHtmlTemplate) {
      for (const [route, data] of Object.entries(ROUTE_PRERENDER)) {
        prerenderCache.set(route, applyPrerender(indexHtmlTemplate, data));
      }
    }

    // Production catch-all: serve prerendered HTML for valid routes, 404 for unknown ones.
    // Applies to ALL visitors — React replaces the bodyHtml on hydration.
    // Non-JS crawlers (social bots, AI crawlers) read the complete HTML directly.
    app.use("*", (req: Request, res: Response, next: NextFunction) => {
      // NOTE: when middleware is mounted on "*", Express puts the matched path in
      // req.baseUrl and leaves req.path as "/", so we must read the real request
      // path from req.originalUrl (stripping any query string). Using req.path here
      // made every request (including /assets/*.js and *.css) resolve to "/" and
      // receive the prerendered home HTML, so the JS/CSS never loaded and React
      // never mounted in production.
      const rawPath = req.originalUrl.split('?')[0];

      // Pass through real static-asset requests (e.g. /assets/index-*.js, favicon.ico)
      // to serveStatic below. Use a true file-extension check rather than a naive
      // "contains a dot" test so SPA routes that happen to include a dot are not
      // mistakenly treated as files.
      if (path.extname(rawPath) !== '') {
        return next();
      }

      // Normalize trailing slash so /contact/ resolves like /contact (root stays "/")
      const reqPath = rawPath.length > 1 ? rawPath.replace(/\/+$/, '') : rawPath;

      // Unknown route: 404 + noindex
      if (!VALID_SPA_ROUTES.has(reqPath)) {
        res.status(404).set('X-Robots-Tag', 'noindex');
        const cached = prerenderCache.get('/');
        if (cached) {
          return res.set('Content-Type', 'text/html').send(
            cached.replace('<title>', '<title>404 Not Found | ')
          );
        }
        if (fs.existsSync(distIndexPath)) {
          return res.sendFile(distIndexPath);
        }
        return res.send('<h1>404 Not Found</h1>');
      }

      // Valid SPA route: serve prerendered HTML
      const prerendered = prerenderCache.get(reqPath);
      if (prerendered) {
        return res.status(200).set('Content-Type', 'text/html').send(prerendered);
      }

      // Fallback: serve plain index.html if prerender cache miss
      next();
    });

    serveStatic(app);
  }

  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
