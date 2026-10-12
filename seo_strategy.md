# SEO Strategy

## In scope
- Public marketing pages
- Floor plans and gallery pages
- Contact, location, community, and virtual tour pages

## Out of scope
- Authenticated admin surface (`/admin`)
- API routes except where they affect crawlability or public rendering

## Target audience
- Renters looking for affordable LIHTC apartments in Knoxville, Tennessee.

## Primary keywords
- affordable housing Knoxville TN
- LIHTC apartments Knoxville
- low income apartments Knoxville
- 2 bedroom apartments Knoxville
- 3 bedroom apartments Knoxville
- Cassell Ridge Apartments

## Technical SEO notes
- The frontend uses Vite + React with Wouter and `react-helmet-async`, but production is hybrid instead of pure SPA.
- In production, `server/index.ts` prerenders route-specific HTML for `/`, `/floor-plans`, `/gallery`, `/community`, `/location`, `/virtual-tours`, and `/contact` before React mounts and replaces the prerendered body.
- Shared-shell issues have outsized impact: all public routes start from `client/index.html`, and the production prerender decides what non-JavaScript crawlers, AI crawlers, and social bots see in the first response.
- Canonical public origin emitted by current source: `https://www.cassellridgeapts.com`.
- Non-JavaScript social and AI crawlers are in scope. Checked-in robots.txt permits public crawling and llms.txt describes the seven public routes.
- Prerender content is hand-authored separately from React page content; review both representations for important content and metadata consistency.

## Dismissed categories
- (None yet)
