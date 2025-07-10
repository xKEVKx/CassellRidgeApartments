# Bicycle Club Apartments - Complete Website & Admin System

## Overview

A sophisticated full-stack web application for Bicycle Club Apartments in Kansas City, Missouri. This project delivers a comprehensive marketing and leasing platform with advanced admin capabilities, featuring modern design, robust functionality, and professional-grade features.

## Key Features

### 🏠 **Marketing Website**
- **Modern Hero Section**: Full-screen immersive design with gradient backgrounds and animated elements
- **Interactive Floor Plans**: Detailed apartment layouts with pricing and scheduling integration
- **Photo Gallery**: Professional image management with category filtering and lightbox functionality
- **Amenities Showcase**: Comprehensive amenity listings with modern card-based design
- **Contact System**: Multi-purpose forms with email integration and lead capture
- **Responsive Design**: Mobile-first approach with optimized layouts for all devices

### 🛠 **Admin Management System**
- **Secure Authentication**: Environment-based password protection with session management
- **Rent Management**: Real-time rent updates with change tracking and timestamps
- **Gallery Management**: Photo upload, compression, categorization, and deletion
- **Promotional Banners**: Toggle promotional status per floor plan with separate tracking
- **Home Page Advertisements**: Complete CRUD system with smart display logic

### 📱 **Home Page Advertisement System**
- **Smart Display Logic**: Configurable frequency (shows expanded for first N visits, then minimizes)
- **Sliding Interface**: Left-side popup that slides in from edge with smooth animations
- **Mobile Optimization**: "Announcement" text on desktop, arrow-only on mobile
- **Persistent State**: Minimized ads remain as clickable tab for continued engagement
- **Image Management**: Automatic compression and base64 storage

## Technical Architecture

### Frontend Stack
- **React 18** with TypeScript for type safety
- **Vite** for fast development and optimized builds
- **Wouter** for lightweight client-side routing
- **TanStack Query** for intelligent server state management
- **Tailwind CSS** with custom design system
- **Radix UI** primitives with shadcn/ui components
- **React Hook Form** with Zod validation

### Backend Stack
- **Node.js** with Express.js server
- **PostgreSQL** with Neon serverless hosting
- **Drizzle ORM** for type-safe database operations
- **Session Management** via connect-pg-simple
- **Email Integration** with ProofPoint SMTP
- **Image Processing** with automatic compression

### Database Schema
- **Users**: Authentication and session management
- **Floor Plans**: Apartment layouts with pricing and promotional status
- **Amenities**: Categorized property features
- **Gallery Images**: Photo management with category organization
- **Contact Submissions**: Lead capture and form data
- **Home Page Ads**: Advertisement management with scheduling

## Development Workflow

### Local Development
```bash
npm install
npm run dev
```

### Database Management
```bash
npm run db:push  # Push schema changes
npm run db:studio  # Open Drizzle Studio
```

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `ADMIN_PASSWORD`: Admin panel authentication
- `NODE_ENV`: Environment mode

## Key Accomplishments

### 🎨 **Modern Design Implementation**
- Ultra-modern luxury apartment website design following 2024 industry trends
- Sophisticated color scheme with emerald/teal gradients
- Contemporary typography with gradient text effects
- Interactive elements with hover animations and micro-interactions

### 🔧 **Technical Excellence**
- Complete admin system with secure authentication
- Real-time data updates with optimistic UI patterns
- Advanced image handling with compression and optimization
- Professional email integration with HTML templates

### 📊 **Content Management**
- Comprehensive gallery system with 35+ authentic Bicycle Club images
- Dynamic floor plan management with promotional banner system
- Intelligent advertisement system with visit tracking
- Streamlined admin interface with tabbed organization

### 🚀 **Performance Optimization**
- File consolidation reducing storage by 50%+ through duplicate elimination
- Optimized image loading with error handling
- Efficient database queries with proper indexing
- Mobile-first responsive design patterns

## Recent Major Updates

### July 10, 2025 - Advertisement System Completion
- Perfect display behavior with smart visit tracking
- Clean interface with streamlined user experience
- Mobile-optimized design with responsive text/arrow display
- Fixed state synchronization for reliable X button functionality

### Content Enhancement & Design Modernization
- Modern card-based amenity design with emoji icons
- Responsive photo positioning for optimal mobile experience
- Nature-focused content emphasizing North Platte Brook Park proximity
- Complete amenities page consolidation with anchor navigation

## Future Enhancements

### Potential Features
- Advanced analytics dashboard for admin insights
- Automated email campaigns for lead nurturing
- Virtual tour integration with 360° imagery
- Advanced search and filtering capabilities
- Multi-language support for diverse demographics

### Technical Improvements
- GraphQL API implementation for more efficient data fetching
- Progressive Web App (PWA) capabilities
- Advanced caching strategies
- Real-time notifications system

## Deployment

The application is configured for seamless deployment on modern hosting platforms with:
- Automatic build optimization
- Environment variable configuration
- Database migration handling
- Static asset optimization

## Contact & Support

This project represents a complete, production-ready apartment marketing and management platform, built with modern web technologies and best practices for scalability, maintainability, and user experience.