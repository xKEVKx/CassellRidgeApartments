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
- The public site is a Vite + React SPA with Wouter and `react-helmet-async`.
- Public marketing routes are client-rendered rather than SSR or prerendered.
- Shared-shell issues have outsized SEO impact because all public routes start from `client/index.html`.

## Dismissed categories
- (None yet)
