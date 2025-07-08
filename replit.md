# The Grove at Deerwood - Apartment Complex Website

## Overview

This is a full-stack web application for "The Grove at Deerwood," a luxury apartment complex in Jacksonville, Florida. The application serves as a comprehensive marketing and leasing platform, featuring apartment listings, amenities, photo galleries, and contact management capabilities.

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