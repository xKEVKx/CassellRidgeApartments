# Cassell Ridge Apartments - LIHTC Affordable Housing Website

## Overview
This is a full-stack web application for "Cassell Ridge Apartments," an affordable housing community in Knoxville, Tennessee. The application serves as a comprehensive marketing and leasing platform for Low-Income Housing Tax Credit (LIHTC) apartments, featuring apartment listings, amenities, photo galleries, contact management, and eligibility information. The project aims to provide an authentic, production-ready platform reflecting Cassell Ridge's brand and offerings.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: Wouter
- **State Management**: TanStack Query (React Query) for server state
- **Styling**: Tailwind CSS with custom design system, Radix UI primitives, and shadcn/ui components
- **Forms**: React Hook Form with Zod validation
- **UI/UX Decisions**: Modern card-based design, professional color scheme using warm brown gradients, smooth animations and transitions, mobile-first responsive design, authentic imagery.

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Database**: PostgreSQL with Drizzle ORM via Neon serverless PostgreSQL
- **API Design**: RESTful API with JSON responses
- **Session Management**: express-session with secure cookie configuration, trust proxy enabled for production reverse proxy compatibility
- **Type Safety**: express-session module augmentation for custom session properties (isAdmin)

### Key Features & Technical Implementations
- **Data Models**: Users (admin), Floor Plans (2br/2ba, 3br/2ba), Amenities, Gallery Images, Contact Submissions, Home Page Ads.
- **API Endpoints**: CRUD operations for floor plans, amenities, gallery, contact submissions, and home page ads. PATCH/PUT endpoints return minimal responses (`{ success: true, id }`) to prevent proxy timeouts with large payloads.
- **Frontend Pages**: Home (LIHTC info, floor plans, eligibility checker), Floor Plans (interactive browser), Gallery (photo gallery with lightbox), Community (living near Cassell Ridge), Contact (embedded Fortress form), Virtual Tours (Matterport 3D), Location (map integration, essential info).
- **UI Component System**: Responsive image galleries, navigation components, toast notifications, smooth anchor scrolling functionality.
- **Authentication**: Admin authentication system with secure session management, explicit session persistence on login, credentials included on all auth-related fetch calls.
- **Content Management**: Admin panel for managing photos, rents, promotional banners, and home page ads with image compression.
- **Email System**: Automatic confirmation emails via Postmark SMTP (legacy system, now managed through Fortress Technologies).
- **Dynamic Content**: Home page ad management system with configurable display frequency and date range scheduling.
- **Property Management Integration**: Complete Fortress Technologies integration with embedded contact forms and resident portal links.
- **Navigation Enhancement**: Hash anchor scrolling and optimized user journey from all call-to-action buttons to contact form via /contact#contact-form URLs.
- **Accessibility**: Integrated Accessibe widget for ADA compliance.
- **Analytics**: Google Analytics 4 (GA4) with measurement ID G-EWTRSPP73F for visitor tracking and site analytics.
- **Security Headers**: Content Security Policy (CSP) headers configured to allow only approved external domains.

## Contact Information
- **Phone**: (865) 357-2712
- **Email**: cassellridge@elmingtonpm.com
- **Address**: 1230 Cassell Valley Way, Knoxville, TN

## Key Technical Decisions

### Production Session/Cookie Configuration
The admin authentication system requires specific configuration to work correctly behind a reverse proxy in production:
1. **Trust Proxy**: `app.set('trust proxy', 1)` is set immediately after Express app creation, before any middleware. This allows Express to recognize HTTPS connections behind the proxy, enabling secure cookies and proper rate limiting.
2. **Session Cookie Config**: Uses `sameSite: 'lax'` for consistent cross-browser behavior, `secure: true` in production, `httpOnly: true` for security, and 24-hour expiration.
3. **Explicit Session Save**: Login handler uses `req.session.save()` callback to guarantee the session is fully written to the store before responding, preventing race conditions with follow-up requests.
4. **Client Credentials**: All login/logout `fetch()` calls include `credentials: 'include'` to ensure cookies are properly sent and stored across requests.
5. **Minimal Update Responses**: PATCH/PUT endpoints return `{ success: true, id }` instead of full objects (which may contain large base64 image data), preventing proxy timeouts. The client already refetches data via TanStack Query cache invalidation after mutations.

### Content Security Policy (CSP)
CSP headers are set via middleware in `server/index.ts` before all other middleware. The policy allows only approved external domains:
- **Scripts**: Google Tag Manager, Google Analytics, Accessibe (accessibility), Replit dev banner
- **Styles**: Google Fonts, CloudFlare CDN (Font Awesome), Accessibe
- **Fonts**: Google Fonts (gstatic), CloudFlare CDN, Accessibe
- **Images**: Google Analytics, Google Tag Manager, Accessibe, Matterport (wildcard)
- **Frames**: Fortress Technologies portal, Matterport virtual tours, Google Maps embeds
- **Connections**: Google Analytics, Google Tag Manager, Accessibe
- **Restrictions**: `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`

### Google Analytics
- GA4 tracking with measurement ID `G-EWTRSPP73F`
- Script loaded via Google Tag Manager in `client/index.html`
- Allowed through CSP headers for scripts, images, and connections

### Navigation & Contact Form Pattern
- All "Schedule Your Tour" and "Schedule Visit" CTA buttons across the site navigate to `/contact#contact-form`
- The Contact page uses a `useEffect` hook with a 100ms delay to auto-scroll to the contact form section when the URL contains `#contact-form`
- Modal popup forms have been completely eliminated in favor of direct navigation to the embedded Fortress Technologies contact form
- Contact form iframe is set to 1200px height for full visibility without internal scrolling
- **Hash links** (`/#amenities`, `/#eligibility`) are rendered as plain `<a>` tags in the navbar and footer (not wouter `<Link>`) so native anchor scrolling works. On the home page itself, in-page CTA buttons use `onClick` `scrollIntoView` because the home page's hash-scroll `useEffect` only runs on mount.

### Floor Plans Page
- Simplified layout focused on apartment options and "Schedule Visit" buttons
- Unit availability section and "View Current Availability" button have been removed
- Floor plans are sorted by bedrooms (ascending) then by name (alphabetically) to ensure "2 Bedroom A" appears before "2 Bedroom B"

### Income Limits & Eligibility (single source of truth)
- Income limits live in one `INCOME_LIMITS` array at the top of `client/src/pages/home.tsx`. The right-hand income table renders from it, and the calculator's `INCOME_LIMITS_BY_HOUSEHOLD` lookup is derived from it via `Object.fromEntries`. **Edit a value once and both the table and the calculator update together.** The table formats the numeric `limit` for display (e.g. `43560` → `$43,560`), so only plain numbers need editing.

## Recent Updates (June 2026)

### Income Limits & Eligibility (home page)
The "INCOME LIMITS & ELIGIBILITY" section on the home page (`client/src/pages/home.tsx`) pairs an interactive eligibility tool with a matching income limits table. (Data-source mechanics are documented under Key Technical Decisions.)

Current limits:

| Household Size | Limit |
|---|---|
| 1 Person | $43,560 |
| 2 People | $49,800 |
| 3 People | $56,040 |
| 4 People | $62,220 |
| 5 People | $67,200 |
| 6 People | $72,180 |
| 7 People | $77,160 |
| 8 People | $82,140 |

- **Checker UI**: Household-size buttons (1–8) plus an optional annual-income input (strips non-numeric characters). A live status box shows the applicable limit and whether the visitor appears to be within it. The income table row matching the selected household size is highlighted (warm-brown background, inset ring, bold label).
- **"Contact Us" dialog**: Pre-fills the visitor's eligibility details (household size, income, estimate) so the leasing team gets context. Emails (`server/email.ts`) render this metadata with HTML escaping (`escapeHtml`) and NaN guards.
- **Validation** (`shared/schema.ts`, `client/src/components/contact-form.tsx`): `insertContactSubmissionSchema` requires name/email/phone with format checks, disallows angle brackets, and caps lengths; the client contact form validation matches.
- **Anchor & navigation**: The section `<div>` has `id="eligibility"` (`scroll-mt-24`). An "Eligibility" nav item (`/#eligibility`) sits between Amenities and Property in `NAVIGATION_LINKS`. "Check Your Eligibility" pill buttons in the hero and bottom CTA scroll to it; the bottom CTA centers the two pills on one row with the outline "Call" button on its own line below.
- **"Check Your Eligibility" pill color**: Both pills (hero + bottom CTA) use a turquoise gradient (`from-[#54D2F6] to-[#22B0D6]`, hover `from-[#3FC6EE] to-[#1A9FC4]`, with a `from-[#7BDDF7] to-[#54D2F6]` hover-glow overlay) to stand out from the warm-brown "Schedule Your Tour" buttons. White text, rounded-2xl shape, shadow, and hover-scale match the other CTAs.
- **Layout**: The intro paragraph and the "Questions about your eligibility?" box both span the full section width (above and below the two-column grid). The two grid columns stretch to equal height so the calculator card matches the income table height; the card is `flex flex-col` with the "Contact Us" button anchored to the bottom via `mt-auto`.

### Community Page
- New `client/src/pages/community.tsx` (route `/community`, registered in `App.tsx`) covering neighborhoods, shopping, dining, schools, parks, and healthcare, with a "Why Rent at Cassell Ridge?" CTA and full `<Helmet>` SEO tags. Added "Community" as the first item in the Property dropdown (`client/src/lib/constants.ts`).
- Design: one consistent `Card` component per section (warm-brown icon badge, title, description), a shared `SectionHeader`, alternating white/slate-50 backgrounds. Hero title kept on one line with `pb-2` so the `bg-clip-text` gradient doesn't clip the "g" descender.

### Footer
- **Dynamic copyright year**: uses `{new Date().getFullYear()}` instead of a hardcoded year (`client/src/components/layout/footer.tsx`).
- **Quick Links resolve correctly**: the list maps `NAVIGATION_LINKS`, flattening the "Property" group into its real child pages (Community, Gallery, Location, Virtual Tours — `/property` is not a route and previously hit NotFound), rendering external links (Residents portal) as `<a target="_blank" rel="noopener noreferrer">`, rendering hash links as plain `<a>`, and keeping internal routes on wouter `<Link>`.

### Gallery Admin
- **Filename display/edit fix**: filenames now derive from the `title` field (set from the original file name at upload) instead of splitting the base64 `imageUrl`, which produced garbled names. `PATCH /api/gallery/:id` reads `title` from the body so edits persist.
- **Drag-and-drop reordering**: "Reorder Photos" mode uses native HTML5 drag-and-drop (position badge + drop-target highlight) instead of up/down arrows.

### Home Page Ads — Production Upload Fix
- Admin "Create Ad" failed in production with a 403 because Replit's autoscale WAF blocked large base64 image strings in JSON bodies. Fixed by switching to binary multipart upload (`FormData` + `multer` `memoryStorage`); the server assembles the base64 `data:` URL from the file buffer. Client compresses via `canvas.toBlob()`.
- Hardening: `startDate`/`endDate` use `z.coerce.date()` to accept ISO strings; client rejects images over 5 MB; image compression has an `onerror` guard.

### SEO — Domain URL Correction
- Replaced the wrong domain (`cassellridge.com`) with `cassellridgeapts.com` everywhere: `sitemap.xml`, `robots.txt`, `index.html` (canonical / OG / Twitter), and per-page `og:url` / JSON-LD across all pages.

### SEO — FAQ Structured Data (FAQPage)
- The home page's 8 eligibility/LIHTC FAQs now also emit `FAQPage` JSON-LD in the page `<head>` (`client/src/pages/home.tsx` Helmet block, alongside the existing `ApartmentComplex` schema). This makes the questions eligible for Google's FAQ rich results for searches like "Do I qualify for LIHTC housing in Knoxville".
- **Single source of truth**: the FAQ content lives in one `FAQS` array at the top of `home.tsx`. The visible "Frequently Asked Questions" section renders from it (via `.map`) and the JSON-LD is generated from the same array, so the structured data can never drift from what users see (Google requires schema to match visible content).
- **Sitemap**: `client/public/sitemap.xml` includes a `/#eligibility` entry pointing at the home page's income limits & eligibility section, and the home page `<loc>` `lastmod` is bumped whenever that content changes. (Search engines often fold `#fragment` URLs into the parent page, so the home page `lastmod` is the primary signal for the new content.)

## Earlier Updates (condensed)
Durable outcomes from these are reflected in **Key Technical Decisions**, **Key Features**, and **External Dependencies** above.

- **May 2026** — Admin login hardening (removed password-length `console.log` leaks); SEO overhaul (`react-helmet-async`, per-page titles/descriptions, JSON-LD `ApartmentComplex` schema, OG tags, `X-Robots-Tag: index, follow`, viewport fix); custom-domain SSL resolved by re-adding the `www.` subdomain.
- **February 2026** — Production session/cookie fix for admin auth behind the reverse proxy, express-session `isAdmin` type augmentation, CSP middleware, and GA4 (all detailed under Key Technical Decisions).
- **August 2025** — Contact form iframe height set to 1200px; Floor Plans page simplified (removed availability section).
- **January 2025** — Postmark SMTP dual-email flow; migrated all content from Tyler, TX to Knoxville, TN; Fortress Technologies integration (resident portal links, embedded contact form); replaced custom forms/modals with the embedded Fortress form and `/contact#contact-form` navigation; floor plan ordering ("2 Bedroom A" before "B").

## Future Feature Considerations
- **Maintenance Request Chatbot**: Potential addition for resident support - would include real-time chat interface, request categorization, resident authentication, ticket tracking system, admin dashboard for property management, and integration with existing notification system

## External Dependencies
- **Database**: Neon (PostgreSQL hosting), Drizzle ORM
- **UI Frameworks**: Radix UI, Tailwind CSS
- **Icons/Fonts**: Font Awesome, Google Fonts (Inter, Playfair Display)
- **Email Service**: Postmark (SMTP)
- **Virtual Tours**: Matterport
- **Property Management System**: Fortress Technologies (complete integration including resident portal navigation links, embedded contact forms)
- **Analytics**: Google Analytics 4 (GA4), Google Tag Manager
- **Development Environment**: Replit
- **Code Quality**: ESLint, Prettier, TypeScript
- **Accessibility**: Accessibe

## Key Files
- `server/index.ts` - Express app setup, trust proxy, middleware, static files, Vite integration
- `server/routes.ts` - All API routes, session configuration, admin authentication, express-session type augmentation
- `server/storage.ts` - Database storage interface and implementations
- `server/email.ts` - Postmark SMTP email integration, eligibility metadata rendering
- `client/src/pages/admin.tsx` - Admin panel with photo management, rent updates, promotional banners, home page ads
- `client/src/pages/home.tsx` - Home page with LIHTC info, floor plan cards, ad slider, and the income limits & eligibility checker (`INCOME_LIMITS` source of truth)
- `client/src/pages/contact.tsx` - Contact page with embedded Fortress form and hash anchor scrolling
- `client/src/pages/community.tsx` - Community / "living near Cassell Ridge" content page
- `client/src/pages/floor-plans.tsx` - Floor plans browser with schedule visit CTAs
- `client/src/lib/constants.ts` - Site config and `NAVIGATION_LINKS` (includes the Eligibility item and Property dropdown)
- `client/src/components/layout/navbar.tsx` - Main navigation with Residents portal link
- `client/src/components/layout/footer.tsx` - Footer with contact info, portal links, and Quick Links
- `shared/schema.ts` - Drizzle ORM schema definitions and Zod validation schemas
