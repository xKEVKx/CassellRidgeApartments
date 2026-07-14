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

// Static internal links injected into every prerendered page so non-JS crawlers
// (GPTBot, ClaudeBot, social bots) can discover and follow the full site structure.
// React replaces <div id="root"> on hydration, so real users see the React navbar/footer.
const STATIC_NAV_HTML = `
<nav aria-label="Site Navigation">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/floor-plans">Floor Plans</a></li>
    <li><a href="/gallery">Photo Gallery</a></li>
    <li><a href="/community">Community</a></li>
    <li><a href="/location">Location &amp; Directions</a></li>
    <li><a href="/virtual-tours">Virtual Tours</a></li>
    <li><a href="/contact">Contact Us</a></li>
    <li><a href="/#amenities">Community Amenities</a></li>
    <li><a href="/#eligibility">Income Limits &amp; Eligibility</a></li>
  </ul>
</nav>
<footer aria-label="Site Footer">
  <p>Cassell Ridge Apartments &mdash; 1230 Cassell Valley Way, Knoxville, TN 37912</p>
  <p>Phone: <a href="tel:+18653572712">(865) 357-2712</a> &mdash; Email: <a href="mailto:cassellridge@elmingtonpm.com">cassellridge@elmingtonpm.com</a></p>
  <nav aria-label="Footer Navigation">
    <a href="/">Home</a> |
    <a href="/floor-plans">Floor Plans</a> |
    <a href="/gallery">Gallery</a> |
    <a href="/community">Community</a> |
    <a href="/location">Location</a> |
    <a href="/virtual-tours">Virtual Tours</a> |
    <a href="/contact">Contact</a>
  </nav>
</footer>`;

// ApartmentComplex JSON-LD — emitted on every public route
const APARTMENT_COMPLEX_JSONLD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "ApartmentComplex",
  "name": "Cassell Ridge Apartments",
  "description": "LIHTC affordable housing community in Knoxville, Tennessee offering spacious 2 and 3 bedroom income-based apartments with modern amenities.",
  "url": "https://www.cassellridgeapts.com",
  "telephone": "+18653572712",
  "email": "cassellridge@elmingtonpm.com",
  "image": "https://www.cassellridgeapts.com/images/cassell-hero.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1230 Cassell Valley Way",
    "addressLocality": "Knoxville",
    "addressRegion": "TN",
    "postalCode": "37912",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 36.0347,
    "longitude": -83.9654
  },
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "08:00", "closes": "17:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Saturday"], "opens": "10:00", "closes": "14:00" }
  ],
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "Swimming Pool", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Fitness Center", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Pet Friendly", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Washer/Dryer Connections", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "On-Site Management", "value": true }
  ],
  "numberOfRooms": "2-3",
  "petsAllowed": true
});

// FAQPage JSON-LD — emitted only on the home page
const FAQPAGE_JSONLD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Low-Income Housing Tax Credit (LIHTC) program?",
      "acceptedAnswer": { "@type": "Answer", "text": "The LIHTC program was created to make quality housing more affordable. It allows communities like Cassell Ridge to offer homes at reduced rental rates to households that meet specific income and eligibility guidelines." }
    },
    {
      "@type": "Question",
      "name": "How do I know if I qualify for a LIHTC home?",
      "acceptedAnswer": { "@type": "Answer", "text": "Eligibility is primarily based on your household's gross (pre-tax) annual income and full-time student status. Review the Students and Income Limits sections for more information. Our team is also available to answer any questions you have along the way!" }
    },
    {
      "@type": "Question",
      "name": "Are all homes at Cassell Ridge part of the LIHTC program?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes, every home at Cassell Ridge is income-restricted through the LIHTC program. All residents must meet the program's income and eligibility requirements to qualify." }
    },
    {
      "@type": "Question",
      "name": "What if my income is over the limit?",
      "acceptedAnswer": { "@type": "Answer", "text": "Because all homes at Cassell Ridge are income-restricted, households exceeding the income limits would not qualify. If you're unsure where you stand, reach out to our team — we're happy to walk through your options with you!" }
    },
    {
      "@type": "Question",
      "name": "Do I have to be a first-time renter to qualify?",
      "acceptedAnswer": { "@type": "Answer", "text": "No, you do not have to be a first-time renter. Your eligibility is based on your income and student status, not your rental history." }
    },
    {
      "@type": "Question",
      "name": "What happens if my income changes after I move in?",
      "acceptedAnswer": { "@type": "Answer", "text": "If your household income increases after you move in, you are usually allowed to remain in your home. However, certain program rules may apply if your income increases significantly. Our team will guide you through any necessary next steps if needed." }
    },
    {
      "@type": "Question",
      "name": "Can full-time students live in a LIHTC home?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes, but with some restrictions. If all household members are full-time students, you must meet one of the specific exceptions listed in the Students section to qualify." }
    },
    {
      "@type": "Question",
      "name": "What documents will I need to provide?",
      "acceptedAnswer": { "@type": "Answer", "text": "You'll be asked to provide documentation verifying your household income, student status (if applicable), and other standard application information. Our leasing team will provide a full checklist to help make the process easy!" }
    }
  ]
});

interface RoutePrerender {
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogImageAlt: string;
  bodyHtml: string;
  jsonLd: string[];
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
    ogImage: 'https://www.cassellridgeapts.com/images/cassell-hero.jpg',
    ogImageAlt: 'Cassell Ridge Apartments exterior view in Knoxville, TN',
    jsonLd: [APARTMENT_COMPLEX_JSONLD, FAQPAGE_JSONLD],
    bodyHtml: `
<main>
  <section aria-label="Hero">
    <h1>Cassell Ridge Apartments &mdash; Affordable LIHTC Housing in Knoxville, TN</h1>
    <img src="/images/cassell-hero.jpg" alt="Cassell Ridge Apartments exterior view in Knoxville, Tennessee" width="1200" height="600" />
    <p>Quality affordable housing approved under the Low-Income Housing Tax Credit (LIHTC) program. Spacious 2 and 3 bedroom apartment homes with modern amenities in Knoxville, Tennessee.</p>
    <p>Income-based rents starting at $950 per month. Income limits apply.</p>
    <p><a href="/floor-plans">View Floor Plans</a> &mdash; <a href="/contact#contact-form">Schedule a Tour</a></p>
  </section>
  <section aria-label="Floor Plans Overview">
    <h2>2 &amp; 3 Bedroom Apartment Homes</h2>
    <p>Choose from spacious floor plans featuring open kitchens, generous closet space, in-unit washer/dryer connections, and private patios or balconies.</p>
    <ul>
      <li><a href="/floor-plans">2 Bedroom / 2 Bathroom</a> &mdash; starting at $950/month</li>
      <li><a href="/floor-plans">3 Bedroom / 2 Bathroom</a> &mdash; contact us for pricing</li>
    </ul>
    <p><a href="/floor-plans">Browse All Floor Plans</a></p>
  </section>
  <section aria-label="Community Amenities" id="amenities">
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
    <p><a href="/contact#contact-form">Contact us</a> if you have questions about eligibility.</p>
  </section>
  <section aria-label="Contact">
    <h2>Schedule a Tour</h2>
    <p>Cassell Ridge Apartments &mdash; 1230 Cassell Valley Way, Knoxville, TN</p>
    <p>Phone: <a href="tel:+18653572712">(865) 357-2712</a> &mdash; Email: <a href="mailto:cassellridge@elmingtonpm.com">cassellridge@elmingtonpm.com</a></p>
    <p><a href="/contact#contact-form">Schedule a Tour</a> &mdash; <a href="/gallery">View Photo Gallery</a> &mdash; <a href="/virtual-tours">Take a Virtual Tour</a></p>
  </section>
</main>`,
  },
  '/floor-plans': {
    title: 'Floor Plans | Cassell Ridge Apartments - Knoxville, TN',
    description: 'Explore 2 and 3 bedroom LIHTC apartment floor plans at Cassell Ridge in Knoxville, TN. View layouts, square footage, and schedule your visit today.',
    canonical: 'https://www.cassellridgeapts.com/floor-plans',
    ogTitle: 'Floor Plans | Cassell Ridge Apartments - Knoxville, TN',
    ogDescription: 'Explore 2 and 3 bedroom LIHTC apartment floor plans at Cassell Ridge in Knoxville, TN. View layouts, square footage, and schedule your visit today.',
    ogImage: 'https://www.cassellridgeapts.com/images/floorplans/cassell-2-bedroom-a.jpg',
    ogImageAlt: '2 Bedroom floor plan layout at Cassell Ridge Apartments',
    jsonLd: [APARTMENT_COMPLEX_JSONLD],
    bodyHtml: `
<main>
  <section aria-label="Floor Plans">
    <h1>Apartment Floor Plans at Cassell Ridge</h1>
    <p>All floor plans participate in the LIHTC affordable housing program. Income limits apply. <a href="/#eligibility">View income limits.</a></p>

    <article>
      <h2>2 Bedroom A &mdash; 2 Bed / 2 Bath</h2>
      <img src="/images/floorplans/cassell-2-bedroom-a.jpg" alt="2 Bedroom A floor plan layout at Cassell Ridge Apartments, Knoxville TN" width="800" height="600" />
      <ul>
        <li>Bedrooms: 2</li>
        <li>Bathrooms: 2</li>
        <li>Square Footage: 989 sq ft</li>
        <li>Starting at $1,245/month</li>
        <li>Open-concept living and dining area</li>
        <li>Full kitchen with modern appliances</li>
        <li>In-unit washer/dryer connections</li>
        <li>Private patio or balcony</li>
        <li>Generous closet space</li>
      </ul>
      <p><a href="/contact#contact-form">Schedule a Visit</a></p>
    </article>

    <article>
      <h2>2 Bedroom B &mdash; 2 Bed / 2 Bath</h2>
      <img src="/images/floorplans/cassell-2-bedroom-b.jpg" alt="2 Bedroom B alternate floor plan layout at Cassell Ridge Apartments, Knoxville TN" width="800" height="600" />
      <ul>
        <li>Bedrooms: 2</li>
        <li>Bathrooms: 2</li>
        <li>Square Footage: 989 sq ft</li>
        <li>Starting at $1,245/month</li>
        <li>Alternate layout with open kitchen</li>
        <li>Generous closet space</li>
        <li>In-unit washer/dryer connections</li>
        <li>Private outdoor space</li>
      </ul>
      <p><a href="/contact#contact-form">Schedule a Visit</a></p>
    </article>

    <article>
      <h2>3 Bedroom &mdash; 3 Bed / 2 Bath</h2>
      <img src="/images/floorplans/cassell-3-bedroom.jpg" alt="3 Bedroom floor plan layout at Cassell Ridge Apartments, Knoxville TN" width="800" height="600" />
      <ul>
        <li>Bedrooms: 3</li>
        <li>Bathrooms: 2</li>
        <li>Square Footage: 1,150 sq ft</li>
        <li>Starting at $1,435/month</li>
        <li>Spacious living area ideal for families</li>
        <li>Full kitchen with modern appliances</li>
        <li>In-unit washer/dryer connections</li>
        <li>Private patio or balcony</li>
        <li>Ample closet and storage space</li>
      </ul>
      <p><a href="/contact#contact-form">Schedule a Visit</a></p>
    </article>

    <p>Contact us at <a href="tel:+18653572712">(865) 357-2712</a> or <a href="mailto:cassellridge@elmingtonpm.com">cassellridge@elmingtonpm.com</a> to learn more about current availability.</p>
    <p><a href="/virtual-tours">Take a 3D Virtual Tour</a> &mdash; <a href="/gallery">View Photo Gallery</a> &mdash; <a href="/contact#contact-form">Contact Us</a></p>
  </section>
</main>`,
  },
  '/gallery': {
    title: 'Photo Gallery | Cassell Ridge Apartments - Knoxville, TN',
    description: 'Browse photos of Cassell Ridge Apartments in Knoxville, TN. View interior and exterior images of our affordable 2 & 3 bedroom LIHTC apartment homes.',
    canonical: 'https://www.cassellridgeapts.com/gallery',
    ogTitle: 'Photo Gallery | Cassell Ridge Apartments - Knoxville, TN',
    ogDescription: 'Browse photos of Cassell Ridge Apartments in Knoxville, TN. View interior and exterior images of our affordable 2 & 3 bedroom LIHTC apartment homes.',
    ogImage: 'https://www.cassellridgeapts.com/images/gallery/cassell-01.jpg',
    ogImageAlt: 'Cassell Ridge Apartments community photo gallery',
    jsonLd: [APARTMENT_COMPLEX_JSONLD],
    bodyHtml: `
<main>
  <section aria-label="Photo Gallery">
    <h1>Photo Gallery &mdash; Cassell Ridge Apartments</h1>
    <p>Explore interior and exterior photos of Cassell Ridge Apartments in Knoxville, Tennessee. Our gallery showcases the living spaces, community amenities, pool area, and landscaped grounds of our LIHTC affordable housing community.</p>

    <figure>
      <img src="/images/gallery/cassell-01.jpg" alt="Cassell Ridge Apartments community exterior" width="800" height="600" />
      <figcaption>Cassell Ridge Apartments &mdash; Knoxville, TN</figcaption>
    </figure>
    <figure>
      <img src="/images/gallery/cassell-02.jpg" alt="Cassell Ridge Apartments exterior view" width="800" height="600" />
      <figcaption>Cassell Ridge Apartments exterior</figcaption>
    </figure>
    <figure>
      <img src="/images/gallery/cassell-03.jpg" alt="Cassell Ridge apartment interior living area" width="800" height="600" />
      <figcaption>Apartment interior &mdash; living area</figcaption>
    </figure>
    <figure>
      <img src="/images/gallery/cassell-04.jpg" alt="Cassell Ridge apartment kitchen" width="800" height="600" />
      <figcaption>Modern kitchen</figcaption>
    </figure>
    <figure>
      <img src="/images/gallery/cassell-05.jpg" alt="Cassell Ridge apartment bedroom" width="800" height="600" />
      <figcaption>Spacious bedroom</figcaption>
    </figure>
    <figure>
      <img src="/images/gallery/cassell-06.jpg" alt="Cassell Ridge community pool area" width="800" height="600" />
      <figcaption>Resort-style swimming pool</figcaption>
    </figure>
    <figure>
      <img src="/images/gallery/cassell-07.jpg" alt="Cassell Ridge fitness center" width="800" height="600" />
      <figcaption>Fitness center</figcaption>
    </figure>
    <figure>
      <img src="/images/gallery/cassell-08.jpg" alt="Cassell Ridge apartment bathroom" width="800" height="600" />
      <figcaption>Modern bathroom</figcaption>
    </figure>
    <figure>
      <img src="/images/gallery/cassell-09.jpg" alt="Cassell Ridge community amenities" width="800" height="600" />
      <figcaption>Community amenities</figcaption>
    </figure>
    <figure>
      <img src="/images/gallery/cassell-10.jpg" alt="Cassell Ridge Apartments landscaped grounds" width="800" height="600" />
      <figcaption>Landscaped grounds</figcaption>
    </figure>
    <figure>
      <img src="/images/gallery/cassell-11.jpg" alt="Cassell Ridge apartment living room" width="800" height="600" />
      <figcaption>Open-concept living room</figcaption>
    </figure>
    <figure>
      <img src="/images/gallery/cassell-12.jpg" alt="Cassell Ridge apartment patio" width="800" height="600" />
      <figcaption>Private patio</figcaption>
    </figure>
    <figure>
      <img src="/images/gallery/cassell-13.jpg" alt="Cassell Ridge Apartments building exterior" width="800" height="600" />
      <figcaption>Building exterior</figcaption>
    </figure>
    <figure>
      <img src="/images/gallery/cassell-14.jpg" alt="Cassell Ridge Apartments community view" width="800" height="600" />
      <figcaption>Community view</figcaption>
    </figure>

    <p>Located at 1230 Cassell Valley Way, Knoxville, TN. Contact us at <a href="tel:+18653572712">(865) 357-2712</a> to <a href="/contact#contact-form">schedule a tour</a>.</p>
    <p><a href="/floor-plans">View Floor Plans</a> &mdash; <a href="/virtual-tours">Take a Virtual Tour</a> &mdash; <a href="/contact#contact-form">Contact Us</a></p>
  </section>
</main>`,
  },
  '/community': {
    title: 'Community | Cassell Ridge Apartments - Knoxville, TN',
    description: 'Discover what\'s near Cassell Ridge Apartments in North Knoxville, TN. Explore nearby neighborhoods, shopping, dining, schools, parks, and healthcare.',
    canonical: 'https://www.cassellridgeapts.com/community',
    ogTitle: 'Community | Cassell Ridge Apartments - Knoxville, TN',
    ogDescription: 'Discover what\'s near Cassell Ridge Apartments in North Knoxville, TN. Explore nearby neighborhoods, shopping, dining, schools, parks, and healthcare.',
    ogImage: 'https://www.cassellridgeapts.com/images/cassell-hero.jpg',
    ogImageAlt: 'Cassell Ridge Apartments neighborhood in North Knoxville, TN',
    jsonLd: [APARTMENT_COMPLEX_JSONLD],
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
    <p><a href="/floor-plans">View Floor Plans</a> &mdash; <a href="/contact#contact-form">Schedule a Tour</a></p>
  </section>
</main>`,
  },
  '/location': {
    title: 'Location & Directions | Cassell Ridge Apartments - Knoxville, TN',
    description: 'Find Cassell Ridge Apartments at 1230 Cassell Valley Way, Knoxville, TN. Conveniently located with easy access to local amenities, schools, and transit.',
    canonical: 'https://www.cassellridgeapts.com/location',
    ogTitle: 'Location & Directions | Cassell Ridge Apartments - Knoxville, TN',
    ogDescription: 'Find Cassell Ridge Apartments at 1230 Cassell Valley Way, Knoxville, TN. Conveniently located with easy access to local amenities, schools, and transit.',
    ogImage: 'https://www.cassellridgeapts.com/images/cassell-hero.jpg',
    ogImageAlt: 'Cassell Ridge Apartments at 1230 Cassell Valley Way, Knoxville, TN',
    jsonLd: [APARTMENT_COMPLEX_JSONLD],
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
    <p><a href="/contact#contact-form">Schedule a Tour</a> &mdash; <a href="/floor-plans">View Floor Plans</a> &mdash; <a href="/community">Explore the Community</a></p>
  </section>
</main>`,
  },
  '/virtual-tours': {
    title: 'Virtual Tours | Cassell Ridge Apartments - Knoxville, TN',
    description: 'Take a 3D virtual tour of Cassell Ridge Apartments in Knoxville, TN. Explore our spacious 2 and 3 bedroom LIHTC affordable apartment floor plans online.',
    canonical: 'https://www.cassellridgeapts.com/virtual-tours',
    ogTitle: 'Virtual Tours | Cassell Ridge Apartments - Knoxville, TN',
    ogDescription: 'Take a 3D virtual tour of Cassell Ridge Apartments in Knoxville, TN. Explore our spacious 2 and 3 bedroom LIHTC affordable apartment floor plans online.',
    ogImage: 'https://www.cassellridgeapts.com/images/floorplans/cassell-3-bedroom.jpg',
    ogImageAlt: '3 Bedroom apartment floor plan at Cassell Ridge Apartments',
    jsonLd: [APARTMENT_COMPLEX_JSONLD],
    bodyHtml: `
<main>
  <section aria-label="Virtual Tours">
    <h1>Virtual Tours &mdash; Cassell Ridge Apartments</h1>
    <p>Explore Cassell Ridge Apartments from the comfort of your own home with our interactive 3D virtual tours. Walk through our 2-bedroom and 3-bedroom apartment layouts using Matterport technology.</p>
    <article>
      <h2>2-Bedroom Virtual Tour</h2>
      <img src="/images/floorplans/cassell-2-bedroom-a.jpg" alt="Preview of 2 Bedroom apartment floor plan at Cassell Ridge" width="800" height="600" />
      <p>Take an immersive 3D walkthrough of our 2-bedroom apartment layout. Experience the spacious living areas, modern kitchen, and comfortable bedrooms. View the tour at <a href="https://discover.matterport.com/space/EQrEazqXEcw">Matterport: 2-Bedroom Tour</a>.</p>
    </article>
    <article>
      <h2>3-Bedroom Virtual Tour</h2>
      <img src="/images/floorplans/cassell-3-bedroom.jpg" alt="Preview of 3 Bedroom apartment floor plan at Cassell Ridge" width="800" height="600" />
      <p>Explore our spacious 3-bedroom apartment with this interactive virtual tour. See the generous living spaces and modern amenities up close. View the tour at <a href="https://discover.matterport.com/space/ZJ5VJ6eqLZk">Matterport: 3-Bedroom Tour</a>.</p>
    </article>
    <p>Ready to schedule an in-person visit? <a href="/contact#contact-form">Contact us</a> or call <a href="tel:+18653572712">(865) 357-2712</a>.</p>
    <p><a href="/floor-plans">View All Floor Plans</a> &mdash; <a href="/gallery">Photo Gallery</a> &mdash; <a href="/contact#contact-form">Schedule a Tour</a></p>
  </section>
</main>`,
  },
  '/contact': {
    title: 'Contact Us | Cassell Ridge Apartments - Knoxville, TN',
    description: 'Contact Cassell Ridge Apartments in Knoxville, TN to schedule a tour or ask about availability. Call (865) 357-2712 or fill out our online form today.',
    canonical: 'https://www.cassellridgeapts.com/contact',
    ogTitle: 'Contact Us | Cassell Ridge Apartments - Knoxville, TN',
    ogDescription: 'Contact Cassell Ridge Apartments in Knoxville, TN to schedule a tour or ask about availability. Call (865) 357-2712 or fill out our online form today.',
    ogImage: 'https://www.cassellridgeapts.com/images/cassell-hero.jpg',
    ogImageAlt: 'Cassell Ridge Apartments leasing office — Knoxville, TN',
    jsonLd: [APARTMENT_COMPLEX_JSONLD],
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
    <p><a href="/floor-plans">View Floor Plans</a> &mdash; <a href="/gallery">Photo Gallery</a> &mdash; <a href="/virtual-tours">Virtual Tours</a></p>
  </section>
</main>`,
  },
};

function escapeAttr(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function applyPrerender(html: string, data: RoutePrerender): string {
  const safeTitle = data.title.replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Build JSON-LD script blocks to inject before </head>
  const jsonLdBlocks = data.jsonLd
    .map(schema => `<script type="application/ld+json">${schema}</script>`)
    .join('\n');

  // Build bodyHtml with static nav appended for crawlers
  const fullBodyHtml = data.bodyHtml + STATIC_NAV_HTML;

  let result = html
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
      /<meta property="og:image"[^>]*>/,
      `<meta property="og:image" content="${escapeAttr(data.ogImage)}" />`
    )
    .replace(
      /<meta property="og:image:alt"[^>]*>/,
      `<meta property="og:image:alt" content="${escapeAttr(data.ogImageAlt)}" />`
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
      /<meta name="twitter:image"[^>]*>/,
      `<meta name="twitter:image" content="${escapeAttr(data.ogImage)}" />`
    )
    .replace(
      '<div id="root"></div>',
      `<div id="root">${fullBodyHtml}</div>`
    );

  // Inject JSON-LD blocks before </head>
  if (jsonLdBlocks) {
    result = result.replace('</head>', `${jsonLdBlocks}\n</head>`);
  }

  return result;
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
