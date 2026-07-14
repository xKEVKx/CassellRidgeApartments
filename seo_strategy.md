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
- The frontend is still a Vite + React app with Wouter and `react-helmet-async`, but production is now hybrid instead of pure SPA.
- In production, `server/index.ts` prerenders route-specific HTML for `/`, `/floor-plans`, `/gallery`, `/community`, `/location`, `/virtual-tours`, and `/contact` before React hydrates.
- Shared-shell issues still have outsized SEO impact because all public routes start from `client/index.html` and the production prerender layer decides what non-JS crawlers, AI crawlers, and social bots can see in the first response.

## Dismissed categories
- (None yet)
