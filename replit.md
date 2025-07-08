# Bicycle Club Apartments - Apartment Complex Website

## Overview

This is a full-stack web application for "Bicycle Club Apartments," a luxury apartment complex in Kansas City, Missouri. The application serves as a comprehensive marketing and leasing platform, featuring apartment listings, amenities, photo galleries, and contact management capabilities.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with custom shadcn/ui components
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **API Design**: RESTful API with JSON responses
- **Session Management**: Connect-pg-simple for PostgreSQL-based sessions
- **Development**: Hot module replacement via Vite middleware integration

### Build System
- **Frontend**: Vite with React plugin and TypeScript support
- **Backend**: esbuild for server bundling and ESM output
- **Development**: Concurrent frontend and backend development with tsx

## Key Components

### Data Models
- **Users**: Basic user authentication system
- **Floor Plans**: Apartment layouts with pricing and availability
- **Amenities**: Property and apartment-level features categorized by type
- **Gallery Images**: Photo management with category-based organization
- **Contact Submissions**: Lead capture and contact form management

### API Endpoints
- `GET /api/floor-plans` - Retrieve all floor plans
- `GET /api/floor-plans/:id` - Get specific floor plan details
- `GET /api/amenities` - Fetch amenities (with optional category filtering)
- `GET /api/gallery` - Retrieve gallery images (with optional category filtering)
- `POST /api/contact` - Submit contact forms and schedule visits

### Frontend Pages
- **Home**: Hero section with call-to-action and featured content
- **Floor Plans**: Interactive apartment layout browser with scheduling
- **Amenities**: Categorized amenity showcase with visual elements
- **Gallery**: Photo gallery with category filtering and lightbox functionality
- **Contact**: Multi-purpose contact forms with lead capture

### UI Component System
- Form components with validation and error handling
- Modal dialogs for scheduling visits and contact forms
- Responsive image galleries with lightbox functionality
- Navigation components with mobile-responsive design
- Toast notifications for user feedback

## Data Flow

### Contact Form Submission
1. User fills out contact form (general inquiry or visit scheduling)
2. Form data validated client-side using Zod schemas
3. POST request sent to `/api/contact` endpoint
4. Server validates and stores submission in database
5. Success/error feedback displayed via toast notifications

### Content Management
1. Static content managed through database tables
2. Images and media referenced by URL in database records
3. Content categorized for easy filtering and organization
4. API endpoints provide filtered data based on query parameters

### State Management
1. Server state managed through TanStack Query
2. Automatic caching and background refetching
3. Optimistic updates for better user experience
4. Error boundaries for graceful failure handling

## External Dependencies

### Database
- **Neon**: Serverless PostgreSQL database hosting
- **Drizzle ORM**: Type-safe database queries and migrations
- **Connection Pooling**: Efficient database connection management

### UI Framework
- **Radix UI**: Accessible, unstyled component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Font Awesome**: Icon library for visual elements
- **Google Fonts**: Inter and Playfair Display typography

### Development Tools
- **Replit**: Development environment integration
- **ESLint/Prettier**: Code formatting and linting
- **TypeScript**: Type safety and developer experience

## Deployment Strategy

### Production Build
- Frontend assets built and optimized via Vite
- Backend server bundled with esbuild for Node.js runtime
- Static assets served from `dist/public` directory
- Environment-specific configuration via environment variables

### Environment Configuration
- `DATABASE_URL`: PostgreSQL connection string
- `NODE_ENV`: Environment mode (development/production)
- Build scripts handle both development and production scenarios

### Hosting Requirements
- Node.js runtime environment
- PostgreSQL database access
- Static file serving capability
- Environment variable configuration

## Changelog

### July 08, 2025 - Complete Website Transformation to Bicycle Club Apartments
- **Accessibility Enhancement**: Added Accessibe widget for improved website accessibility compliance
- **Gallery Photo Review**: Corrected all 35 photo categorizations and descriptions to accurately reflect apartment interiors vs exteriors
- **Page Title Update**: Changed browser tab title from "The Grove at Deerwood" to "Bicycle Club Apartments - Luxury Living in Kansas City, MO"
- **Meta Tags**: Updated all SEO meta descriptions and Open Graph tags to reflect Bicycle Club branding
- **Gallery Enhancement**: Added 35+ authentic Bicycle Club images from amenities page with proper categorization
- **Complete Brand Transformation**: Updated entire website from Grove at Deerwood to Bicycle Club Apartments
- **Location Change**: Transformed from Jacksonville, Florida to Kansas City, Missouri content
- **New Floor Plans**: Updated to Bicycle Club's 4 floor plans (Aspen, Vail, Montrose, Vista) with correct pricing and square footage
- **Authentic Images**: Downloaded and integrated 25+ authentic images from Bicycle Club website including:
  - Floor plan images for all 4 layouts
  - Interior photos showcasing apartments
  - Pool and amenity photos
  - Building exterior and landscape photos
  - Community areas and fitness center
- **Contact Information**: Updated all contact details to Kansas City location and hours
- **Amenities Update**: Replaced amenities with Bicycle Club specific features:
  - 24-hour fitness center
  - Resort-like pool with sand volleyball court
  - Pet-friendly dog park
  - Wood burning fireplaces in select units
  - AAA rated Park Hill School District proximity
- **Virtual Tours**: Updated to include actual Bicycle Club YouTube tours
- **External Links**: Updated leasing and resident portal links to Bicycle Club systems
- **Database Migration**: Completely refreshed database with authentic Bicycle Club data
- **Location Page**: Updated nearby attractions to Kansas City area including Zona Rosa, UMKC, and local amenities

### July 08, 2025 - Complete Navigation Structure Implementation
- **Complete Navigation Overhaul**: Updated navigation to match original Grove at Deerwood website structure
- **Property Dropdown Menu**: Added Property dropdown with Gallery, Location, and Virtual Tours submenus
- **New Pages Created**: 
  - Location page with interactive map, contact info, and nearby attractions
  - Virtual Tours page with links to YouTube property videos
- **External Links Integration**: Added Leasing and Rent Payment links to external Grove systems
- **Authentic Images**: Downloaded and integrated additional Grove property images
- **Mobile Navigation**: Enhanced mobile menu with proper dropdown support and external links
- **Dropdown Functionality**: Implemented sophisticated dropdown menus with hover effects and active states

### July 08, 2025 - Major Website Modernization
- **Complete Modern Redesign**: Implemented ultra-modern luxury apartment website design based on 2024 industry trends
- **Hero Section**: Full-screen immersive layout with gradient backgrounds, floating elements, and sophisticated typography
- **Color Scheme**: Updated to use emerald/teal gradients while maintaining original Grove at Deerwood natural branding
- **Navigation**: Modern glass-effect navbar with gradient buttons, enhanced mobile menu with backdrop blur
- **Typography**: Bold, contemporary font hierarchy with gradient text effects and improved spacing
- **Interactive Elements**: Hover animations, micro-interactions, and scale effects throughout
- **Layout Updates**: Card-based designs, floating elements, sophisticated spacing, and contemporary visual hierarchy
- **Background Integration**: Used actual Grove at Deerwood property images from original website
- **Mobile Optimization**: Enhanced mobile navigation with modern sheet design and improved responsive layouts

### Technical Enhancements
- Enhanced CSS utilities with custom shadow system, glass effects, and scrollbar styling
- Implemented gradient backgrounds and advanced backdrop filters
- Added sophisticated animation and transition effects
- Modernized button designs with scale and hover effects
- Integrated contemporary spacing and border radius standards

### July 08, 2025 - Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.