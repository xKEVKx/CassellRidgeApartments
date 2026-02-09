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
- **Frontend Pages**: Home (LIHTC info, floor plans), Floor Plans (interactive browser), Gallery (photo gallery with lightbox), Contact (embedded Fortress form), Virtual Tours (Matterport 3D), Location (map integration, essential info).
- **UI Component System**: Responsive image galleries, navigation components, toast notifications, smooth anchor scrolling functionality.
- **Authentication**: Admin authentication system with secure session management, explicit session persistence on login, credentials included on all auth-related fetch calls.
- **Content Management**: Admin panel for managing photos, rents, promotional banners, and home page ads with image compression.
- **Email System**: Automatic confirmation emails via Postmark SMTP (legacy system, now managed through Fortress Technologies).
- **Dynamic Content**: Home page ad management system with configurable display frequency and date range scheduling.
- **Property Management Integration**: Complete Fortress Technologies integration with embedded contact forms and resident portal links.
- **Navigation Enhancement**: Hash anchor scrolling and optimized user journey from all call-to-action buttons to contact form via /contact#contact-form URLs.
- **Accessibility**: Integrated Accessibe widget for ADA compliance.

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

### Navigation & Contact Form Pattern
- All "Schedule Your Tour" and "Schedule Visit" CTA buttons across the site navigate to `/contact#contact-form`
- The Contact page uses a `useEffect` hook with a 100ms delay to auto-scroll to the contact form section when the URL contains `#contact-form`
- Modal popup forms have been completely eliminated in favor of direct navigation to the embedded Fortress Technologies contact form
- Contact form iframe is set to 1200px height for full visibility without internal scrolling

### Floor Plans Page
- Simplified layout focused on apartment options and "Schedule Visit" buttons
- Unit availability section and "View Current Availability" button have been removed
- Floor plans are sorted by bedrooms (ascending) then by name (alphabetically) to ensure "2 Bedroom A" appears before "2 Bedroom B"

## Recent Updates (February 2026)
- **Contact Form Height**: Increased iframe height to 1200px for full form visibility without scrolling
- **Floor Plans Simplification**: Removed unit availability section and "View Current Availability" button from Floor Plans page
- **Production Session/Cookie Fix**: Comprehensive fix for admin authentication behind reverse proxy:
  - Added `app.set('trust proxy', 1)` in server/index.ts before all middleware
  - Added `sameSite: 'lax'` to session cookie configuration
  - Login handler now uses `req.session.save()` callback for guaranteed session persistence
  - Login and logout fetch calls include `credentials: 'include'`
  - All PATCH/PUT routes return minimal `{ success: true, id }` responses instead of full objects to prevent proxy timeouts
- **TypeScript Session Types**: Added express-session module augmentation declaring `SessionData.isAdmin` boolean property

## Previous Updates (January 2025)
- **Email System**: Complete Postmark SMTP integration with dual email flow (notification + confirmation)
- **SMTP Configuration**: Verified sender addresses using no-reply@cassellridgeapts.com with reply-to routing
- **Property Information**: Updated all references from Tyler, TX to Knoxville, TN with correct contact details
- **Email Templates**: Professional HTML templates with Cassell Ridge branding and brown color scheme
- **TypeScript**: Resolved all compilation errors for production-ready code
- **SEO**: Comprehensive optimization with local business schema for Knoxville market
- **UI Refinements**: Cleaned up pricing displays across site - removed "From" prefix from home page floor plan cards, removed "Starting at" overlay from amenities section, simplified "Rent:" label on floor plans page
- **Navigation**: Removed "Apply Now" button from Virtual Tours page for streamlined user experience
- **Content Ordering**: Updated floor plans API to display "2 Bedroom A" before "2 Bedroom B" with proper alphabetical sorting
- **Admin UX**: Added autofocus to admin login password field for improved user experience
- **Accessibility**: Confirmed Accessibe accessibility widget integration - script loads automatically on all pages for ADA compliance
- **Fortress Technologies Integration**: Complete integration with property management system including resident portal links in navigation and footer, embedded contact form on contact page
- **Navigation Enhancement**: Added "Residents" menu item linking to Fortress portal between Property and Contact sections in main navigation and footer
- **Contact Form Replacement**: Replaced all custom contact forms with embedded Fortress Technologies contact page for centralized lead management
- **Button Navigation Optimization**: Updated all CTA buttons to redirect to /contact#contact-form with smooth scrolling
- **Modal Removal**: Eliminated all modal popup forms in favor of direct navigation to embedded Fortress contact form
- **Hash Anchor Scrolling**: Implemented automatic scrolling to contact form section when accessing /contact#contact-form URLs

## Future Feature Considerations
- **Maintenance Request Chatbot**: Potential addition for resident support - would include real-time chat interface, request categorization, resident authentication, ticket tracking system, admin dashboard for property management, and integration with existing notification system

## External Dependencies
- **Database**: Neon (PostgreSQL hosting), Drizzle ORM
- **UI Frameworks**: Radix UI, Tailwind CSS
- **Icons/Fonts**: Font Awesome, Google Fonts (Inter, Playfair Display)
- **Email Service**: Postmark (SMTP)
- **Virtual Tours**: Matterport
- **Property Management System**: Fortress Technologies (complete integration including resident portal navigation links, embedded contact forms)
- **Development Environment**: Replit
- **Code Quality**: ESLint, Prettier, TypeScript
- **Accessibility**: Accessibe

## Key Files
- `server/index.ts` - Express app setup, trust proxy, middleware, static files, Vite integration
- `server/routes.ts` - All API routes, session configuration, admin authentication, express-session type augmentation
- `server/storage.ts` - Database storage interface and implementations
- `server/email.ts` - Postmark SMTP email integration
- `client/src/pages/admin.tsx` - Admin panel with photo management, rent updates, promotional banners, home page ads
- `client/src/pages/contact.tsx` - Contact page with embedded Fortress form and hash anchor scrolling
- `client/src/pages/floor-plans.tsx` - Floor plans browser with schedule visit CTAs
- `client/src/pages/home.tsx` - Home page with LIHTC info, floor plan cards, and ad slider
- `client/src/components/layout/navbar.tsx` - Main navigation with Residents portal link
- `client/src/components/layout/footer.tsx` - Footer with contact info and portal links
- `shared/schema.ts` - Drizzle ORM schema definitions and Zod validation schemas
