# Cassell Ridge Apartments - LIHTC Affordable Housing Website

## Overview
This is a full-stack web application for "Cassell Ridge Apartments," an affordable housing community in Tyler, Texas. The application serves as a comprehensive marketing and leasing platform for Low-Income Housing Tax Credit (LIHTC) apartments, featuring apartment listings, amenities, photo galleries, contact management, and eligibility information. The project aims to provide an authentic, production-ready platform reflecting Cassell Ridge's brand and offerings.

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
- **Frontend Pages**: Home (LIHTC info, floor plans), Floor Plans (interactive browser, unit availability via iframe), Gallery (photo gallery with lightbox), Contact (forms, lead capture), Virtual Tours (Matterport 3D), Location (map integration, essential info).
- **UI Component System**: Form components with validation, modal dialogs, responsive image galleries, navigation components, toast notifications.
- **Authentication**: Admin authentication system with secure session management.
- **Content Management**: Admin panel for managing photos, rents, promotional banners, and home page ads with image compression.
- **Email System**: Automatic confirmation emails for contact submissions using Postmark SMTP.
- **Dynamic Content**: Home page ad management system with configurable display frequency and date range scheduling.
- **Accessibility**: Integrated Accessibe widget.

## External Dependencies
- **Database**: Neon (PostgreSQL hosting), Drizzle ORM
- **UI Frameworks**: Radix UI, Tailwind CSS
- **Icons/Fonts**: Font Awesome, Google Fonts (Inter, Playfair Display)
- **Email Service**: Postmark (SMTP)
- **Virtual Tours**: Matterport
- **Unit Availability/Leasing**: Fortress Technologies (iframe integration for unit availability, external links for resident portal)
- **Development Environment**: Replit
- **Code Quality**: ESLint, Prettier, TypeScript
- **Accessibility**: Accessibe