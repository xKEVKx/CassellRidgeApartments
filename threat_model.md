# Threat Model

## Project Overview

Cassell Ridge Apartments is a public-facing marketing and leasing website with a React frontend, an Express API, and a PostgreSQL database accessed through Drizzle ORM. Public visitors can browse apartment content, while a small admin surface is intended to manage floor plans, gallery images, contact submissions, and home page ads. The app is deployed on Replit autoscale and is publicly reachable on the internet.

Production-scope assumptions for this scan:
- The deployed site is public, so all production HTTP routes are internet-reachable.
- `NODE_ENV` is `production` in production deployments.
- Replit provides TLS termination, so transport security is not the primary code-level concern here.
- Dev-only Vite middleware, local scripts, attached assets, and mockup/sandbox paths are out of scope unless production reachability is demonstrated.

## Assets

- **Admin session state** — the `isAdmin` session flag controls access to content-management functions. Compromise would allow site defacement, unauthorized content changes, or data exposure.
- **Contact submissions** — names, email addresses, phone numbers, free-form messages, and metadata are stored server-side. This is tenant/prospect PII.
- **Site content and media** — floor plan pricing, promotional flags, gallery images, and home page ads affect public-facing business content and brand trust.
- **Infrastructure and service secrets** — database credentials, SMTP/Postmark credentials, session secret, and admin password stored in environment variables.
- **Outbound email capability** — the server can send notification and confirmation emails through Postmark SMTP, which can be abused for spam or operational disruption if exposed through unprotected flows.

## Trust Boundaries

- **Browser to Express API** — every client request crosses from an untrusted browser into trusted server code. All authentication, authorization, validation, and abuse controls must be enforced server-side.
- **Public visitors to admin functions** — the same application exposes both public content routes and admin management endpoints. This boundary must not rely on frontend state or hidden URLs.
- **Express API to PostgreSQL** — the server has direct write access to floor plans, gallery data, ads, and contact submissions. Unauthorized API access can directly modify or extract stored data.
- **Express API to Postmark SMTP** — public input can trigger outbound email. Abuse protections are required so the app cannot be used as a mail relay or email-bombing primitive.
- **Production vs development tooling** — `server/vite.ts` is development-only, while `server/index.ts` and `server/routes.ts` define the production attack surface.

## Scan Anchors

- **Production entry points:** `server/index.ts`, `server/routes.ts`, `server/storage.ts`, `shared/schema.ts`
- **Highest-risk areas:** admin auth/session handling, write-capable `/api/*` routes, contact submission/email flow, file/media upload paths
- **Surface split:** public read routes (`/api/floor-plans`, `/api/gallery`, `/api/home-page-ads/active`) vs intended admin routes (mutations, contact submission review, initialization, email test)
- **Usually dev-only:** `server/vite.ts`, local scripts in repo root, documentation files, attached assets

## Threat Categories

### Spoofing

This project uses a simple password-based admin login that sets `req.session.isAdmin` in an Express session. The application must ensure that only successful, server-validated authentication can create or use an admin session, and that login endpoints resist brute-force attempts from the public internet.

### Tampering

The highest-risk tampering threat is unauthorized modification of public site content through write-capable API routes. Floor plan prices, promotions, gallery images, photo ordering, and home page ads must only be mutable by authenticated admins, with server-side enforcement on every write endpoint.

### Information Disclosure

Contact submissions contain prospect PII and should be visible only to authorized admins. API responses, logs, and diagnostic endpoints must not leak sensitive submission data, internal service health, or operational details to unauthenticated users.

### Denial of Service

Public endpoints that write to the database, accept uploads, or trigger outbound email can be abused to consume storage, SMTP quota, or staff attention. The application must rate-limit login and contact-style endpoints, and protect expensive or high-impact actions from anonymous abuse.

### Elevation of Privilege

The main elevation-of-privilege risk is broken server-side authorization: any route intended for admin-only use must independently verify admin privileges instead of trusting frontend state such as `sessionStorage`. Initialization or maintenance endpoints must also be protected or removed from production so anonymous users cannot gain administrative impact.