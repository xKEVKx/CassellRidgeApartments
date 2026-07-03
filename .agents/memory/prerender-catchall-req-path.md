---
name: Production prerender catch-all path handling
description: Why the production SPA catch-all must read req.originalUrl, not req.path, under an app.use("*") mount
---

# Wildcard-mounted middleware and req.path

The production catch-all in `server/index.ts` is mounted with `app.use("*", ...)`.
For middleware mounted on a path pattern like `"*"`, Express puts the matched
portion in `req.baseUrl` and leaves `req.path` as `"/"` for **every** request.

**Rule:** inside `app.use("*", ...)`, derive the real request path from
`req.originalUrl` (strip the query string), never from `req.path`.

**Why:** Reading `req.path` made every request — including `/assets/*.js` and
`/assets/*.css` — resolve to `"/"`, match a valid SPA route, and receive the
prerendered home HTML (status 200, `text/html`, ~5.6 KB). The browser then got
HTML where it expected JS/CSS, so nothing loaded and React never mounted; the
published site showed only the unstyled prerender fallback. Dev mode was fine
because it uses the Vite middleware path, not this catch-all.

**How to apply:**
- Use `const rawPath = req.originalUrl.split('?')[0];`.
- Detect real static files with `path.extname(rawPath) !== ''` (not a naive
  `includes('.')`, which would misclassify dotted SPA routes) so they fall
  through via `next()` to `serveStatic` (registered after the catch-all).
- Normalize trailing slashes before matching `VALID_SPA_ROUTES`
  (`/contact/` -> `/contact`, root stays `/`).
- This bug only manifests in the production build (`npm run build` +
  `NODE_ENV=production`); the dev workflow will not reproduce it.
