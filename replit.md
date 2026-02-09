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
- **Session Management**: Connect-pg-simple for PostgreSQL-based sessions

### Key Features & Technical Implementations
- **Data Models**: Users (admin), Floor Plans (2br/2ba, 3br/2ba), Amenities, Gallery Images, Contact Submissions, Home Page Ads.
- **API Endpoints**: CRUD operations for floor plans, amenities, gallery, contact submissions, and home page ads.
- **Frontend Pages**: Home (LIHTC info, floor plans), Floor Plans (interactive browser, unit availability iframe), Gallery (photo gallery with lightbox), Contact (embedded Fortress form), Virtual Tours (Matterport 3D), Location (map integration, essential info).
- **UI Component System**: Responsive image galleries, navigation components, toast notifications, smooth anchor scrolling functionality.
- **Authentication**: Admin authentication system with secure session management.
- **Content Management**: Admin panel for managing photos, rents, promotional banners, and home page ads with image compression.
- **Email System**: Automatic confirmation emails via Postmark SMTP (legacy system, now managed through Fortress Technologies).
- **Dynamic Content**: Home page ad management system with configurable display frequency and date range scheduling.
- **Property Management Integration**: Complete Fortress Technologies integration with embedded contact forms, resident portal links, and real-time unit availability displays.
- **Navigation Enhancement**: Hash anchor scrolling and optimized user journey from all call-to-action buttons to contact form.
- **Accessibility**: Integrated Accessibe widget for ADA compliance.

## Recent Updates (January 2025)
- **Email System**: Complete Postmark SMTP integration with dual email flow (notification + confirmation)
- **SMTP Configuration**: Verified sender addresses using no-reply@cassellridgeapts.com with reply-to routing
- **Property Information**: Updated all references from Tyler, TX to Knoxville, TN with correct contact details
- **Contact Information**: Phone (865) 357-2712, Email cassellridge@elmingtonpm.com, Address 1230 Cassell Valley Way
- **Email Templates**: Professional HTML templates with Cassell Ridge branding and brown color scheme
- **TypeScript**: Resolved all compilation errors for production-ready code
- **SEO**: Comprehensive optimization with local business schema for Knoxville market
- **UI Improvements**: Hidden Unit Availability section pending correct embed link, Location page updated for Knoxville
- **Testing**: Complete SMTP verification with successful email delivery confirmed
- **UI Refinements**: Cleaned up pricing displays across site - removed "From" prefix from home page floor plan cards, removed "Starting at" overlay from amenities section, simplified "Rent:" label on floor plans page
- **Navigation**: Removed "Apply Now" button from Virtual Tours page for streamlined user experience
- **Content Ordering**: Updated floor plans API to display "2 Bedroom A" before "2 Bedroom B" with proper alphabetical sorting
- **Admin UX**: Added autofocus to admin login password field for improved user experience
- **Accessibility**: Confirmed Accessibe accessibility widget integration - script loads automatically on all pages for ADA compliance
- **Fortress Technologies Integration**: Complete integration with property management system including resident portal links in navigation and footer, embedded contact form on contact page, and unit availability iframe on floor plans page
- **Navigation Enhancement**: Added "Residents" menu item linking to Fortress portal between Property and Contact sections in main navigation and footer
- **Contact Form Replacement**: Replaced all custom contact forms with embedded Fortress Technologies contact page for centralized lead management
- **Unit Availability Display**: Added real-time unit availability iframe to floor plans page with smooth-scroll "View Current Availability" button
- **Button Navigation Optimization**: Updated all "Schedule Your Tour" and "Schedule Visit" buttons to redirect to contact form section with smooth scrolling functionality
- **Modal Removal**: Eliminated all modal popup forms in favor of direct navigation to embedded Fortress contact form
- **Hash Anchor Scrolling**: Implemented automatic scrolling to contact form section when accessing /contact#contact-form URLs
- **Production Session/Cookie Fix**: Added trust proxy, sameSite cookie config, explicit session save on login, credentials: 'include' on client fetch calls, and minimal PATCH/PUT responses to prevent proxy timeouts
- **TypeScript Session Types**: Added express-session module augmentation for isAdmin property

## Future Feature Considerations
- **Maintenance Request Chatbot**: Potential addition for resident support - would include real-time chat interface, request categorization, resident authentication, ticket tracking system, admin dashboard for property management, and integration with existing notification system

## External Dependencies
- **Database**: Neon (PostgreSQL hosting), Drizzle ORM
- **UI Frameworks**: Radix UI, Tailwind CSS
- **Icons/Fonts**: Font Awesome, Google Fonts (Inter, Playfair Display)
- **Email Service**: Postmark (SMTP)
- **Virtual Tours**: Matterport
- **Property Management System**: Fortress Technologies (complete integration including resident portal navigation links, embedded contact forms, and real-time unit availability displays)
- **Development Environment**: Replit
- **Code Quality**: ESLint, Prettier, TypeScript
- **Accessibility**: Accessibe