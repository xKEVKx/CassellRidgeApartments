# Cassell Ridge Apartments - LIHTC Affordable Housing Website

## Overview

This is a full-stack web application for "Cassell Ridge Apartments," an affordable housing community in Tyler, Texas. The application serves as a comprehensive marketing and leasing platform for Low-Income Housing Tax Credit (LIHTC) apartments, featuring apartment listings, amenities, photo galleries, contact management, and eligibility information.

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
- **Users**: Admin authentication system
- **Floor Plans**: 3 apartment layouts with authentic Cassell Ridge specifications:
  - 2 Bedroom A: 2br/2ba, 989sqft, $950/month
  - 2 Bedroom B: 2br/2ba, 989sqft, $950/month  
  - 3 Bedroom: 3br/2ba, 1150sqft, $1100/month
- **Amenities**: Property and apartment-level features categorized by type
- **Gallery Images**: 14 authentic Cassell Ridge photos organized by categories:
  - 7 interior apartment photos showcasing living spaces
  - 2 exterior building and landscape photos
  - 5 amenity photos (pool, fitness center, community areas)
- **Contact Submissions**: Lead capture and contact form management
- **Home Page Ads**: Advertisement management system for promotions

### API Endpoints
- `GET /api/floor-plans` - Retrieve all floor plans
- `GET /api/floor-plans/:id` - Get specific floor plan details
- `GET /api/amenities` - Fetch amenities (with optional category filtering)
- `GET /api/gallery` - Retrieve gallery images (with optional category filtering)
- `POST /api/contact` - Submit contact forms and schedule visits

### Frontend Pages
- **Home**: Hero section with LIHTC information, collapsible FAQ sections, floor plans showcase
- **Floor Plans**: Interactive apartment layout browser with scheduling (3 plans)
- **Gallery**: Photo gallery with 14 authentic images and lightbox functionality
- **Contact**: Multi-purpose contact forms with lead capture
- **Virtual Tours**: Matterport 3D tour integration
- **Location**: Essential property location information with map integration (streamlined)

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

### July 25, 2025 - Complete Cassell Ridge Transformation & Production Readiness
- **Complete Branding Transformation**: Successfully transformed from Bicycle Club Apartments to Cassell Ridge Apartments
- **Authentic Visual Identity**: Implemented authentic Cassell Ridge logo and hero image from source materials
- **LIHTC Program Integration**: Added comprehensive LIHTC (Low-Income Housing Tax Credit) information with:
  - Collapsible Students, Income Limits, and FAQ sections starting collapsed with 3-row vertical layout
  - Authentic income limits and eligibility requirements
  - Complete LIHTC program explanations and guidelines
- **Authentic Photo Gallery**: Downloaded and integrated 14 high-quality images from password-protected gallery:
  - 7 interior apartment photos
  - 2 exterior building/landscape photos  
  - 5 amenity photos (pool, fitness center, community areas)
- **Floor Plans Update**: Updated to reflect actual Cassell Ridge offerings:
  - 3 floor plans: 2 Bedroom A, 2 Bedroom B, 3 Bedroom
  - All plans feature 2 full bathrooms
  - Authentic pricing: $950 for 2BR, $1100 for 3BR
  - Centered layout with proper responsive design and accurate bedroom/bathroom counts
- **Content Optimization**: 
  - Updated "Nature Meets City" to "Comfort Meets Community" with relevant messaging
  - Corrected statistics: 8+ Quality Amenities, 3 Floor Plan Options, LIHTC Affordable Housing
  - Enhanced mobile navigation with larger logo and scrollable menu
  - Updated "Ready to Make Cassell Ridge Home" section to reflect 3 floor plan options
- **Location Page Streamlining**: Removed three sections for cleaner focus:
  - Removed "The Property Layout" section with site map and community features
  - Removed "What's Nearby" section with local attractions and amenities
  - Removed "Easy Access & Transportation" section with highway access information
  - Updated hero section to reflect Cassell Ridge in Tyler, Texas with reduced height
- **Office Hours Update**: Standardized office hours across entire site:
  - Monday-Friday: 8AM to 5PM
  - Saturday: 10AM to 2PM
  - Sunday: Closed
- **Technical Implementation**:
  - PostgreSQL database with authentic Cassell Ridge data
  - Removed KNOCK integration references
  - Admin system for photo and content management
  - Responsive design optimized for all devices
  - Fixed footer office hours display to match constants configuration
- **Production Ready**: All components tested and verified working correctly

#### Authentication & Access
- Successfully accessed password-protected gallery site (maroon-lime-b9nb.squarespace.com) with "demo" password
- Downloaded authentic marketing materials and integrated into application
- Maintained secure admin system for ongoing content management

#### LIHTC Compliance Features
- Complete income limit tables with 1-7 person household limits
- Student eligibility exceptions and restrictions clearly outlined
- FAQ section covering common LIHTC program questions
- Collapsible sections with 3-row vertical layout for better user experience and content organization

#### Visual & UX Enhancements
- Modern card-based design for amenities and floor plans
- Smooth animations and transitions throughout
- Professional color scheme using warm brown gradients
- Mobile-first responsive design with enhanced navigation
- Authentic imagery showcasing actual property amenities and interiors
- Centered floor plans display with accurate statistics

### July 25, 2025 - Final Content & Location Page Optimization
- **Location Page Streamlining**: Completed removal of three non-essential sections:
  - Removed "The Property Layout" section with detailed site map and community features list
  - Removed "What's Nearby" section with local attractions, shopping, and entertainment listings
  - Removed "Easy Access & Transportation" section with highway access and commuting information
  - Location page now focuses exclusively on essential contact information and map
- **Hero Section Enhancement**: 
  - Updated Location page hero to properly reflect "Cassell Ridge Apartments" branding
  - Changed location reference from Knoxville to Tyler, Texas for accuracy
  - Reduced hero section height from 32 to 20 padding units for better proportion
  - Updated content to emphasize affordable LIHTC housing and community focus
- **Office Hours Standardization**: Fixed inconsistent office hours display across all pages:
  - Standardized to Monday-Friday: 8AM to 5PM, Saturday: 10AM to 2PM, Sunday: Closed
  - Updated constants file with correct property names for consistent referencing
  - Fixed footer component to properly display all three time periods
  - Ensured consistency across Location page, Contact page, Footer, and all other references
- **Final Production State**: All components now display consistent Cassell Ridge branding and information
  - Complete transformation from Bicycle Club to Cassell Ridge successfully implemented
  - All 14 authentic gallery images properly displaying
  - 3 floor plans with accurate specifications and LIHTC pricing
  - LIHTC sections with proper collapsible functionality and 3-row layout
  - Office hours consistent across entire site
  - Location page optimized for essential information only

#### Technical Improvements
- Fixed footer component property references to match updated SITE_CONFIG structure
- Resolved all TypeScript errors and property access issues
- Streamlined Location page component by removing unused imports and data
- Maintained responsive design throughout all changes
- Ensured all database references remain functional and accurate

### July 30, 2025 - Layout Improvements & Content Streamlining
- **Section Layout Consistency**: Updated all LIHTC sections to have icons and text aligned on the same line:
  - Students section: 🎓 icon inline with "STUDENTS" text
  - Income Limits section: 💰 icon inline with "INCOME LIMITS" text
  - FAQ section: ❓ icon inline with "FREQUENTLY ASKED QUESTIONS" text
  - Pet Policy section: 🐾 icon inline with "Pet Policy" text
- **Content Streamlining**: Removed "Comfort Meets Community" section to improve homepage flow
  - Eliminated dark background section with community feature cards
  - Direct flow from LIHTC sections to floor plans for better user experience
  - Cleaner, more focused homepage layout emphasizing core property information
- **Floor Plans Section Content Update**: Updated descriptive text under "Find Your Perfect Space"
  - Changed "2 and 3 bedroom" to "2 and 3-bedroom" (proper hyphenation)
  - Changed "2 full bathrooms" to "two full bathrooms" (spelled out numbers)
  - Changed "comfortable modern living" to "comfortable affordable living" (emphasizing LIHTC affordable housing)
- **Office Hours Standardization**: Updated office hours formatting across all pages
  - Saturday: Added "Saturday:" label prefix for clarity
  - Sunday: Added "Sunday:" label prefix for consistency
  - Maintained consistent formatting: "Saturday: 10AM to 2PM" and "Sunday: Closed"
  - Updated in constants file ensures consistency across Contact page, Footer, Location page, and all site references

### July 29, 2025 - Resident Portal & Unit Availability Integration
- **Hero Section Updates**: Changed "Online Leasing" button to "Resident Portal" with Fortress Technologies portal link
- **Hero Pill Navigation Fix**: Fixed hero pill buttons to properly scroll to #amenities section with smooth scrolling behavior
- **Unit Availability Embed**: Added Fortress Technologies unit availability iframe to Floor Plans page
  - Real-time unit availability display
  - Online application functionality
  - Professional styling with rounded container and shadow
  - Responsive design with 600px height
- **Navigation Improvements**: Replaced problematic Link components with proper anchor scrolling for better user experience
- **Hero Image Enhancement**: Adjusted hero background positioning and zoom (120% size, center 25%) to minimize parking lot visibility and emphasize apartment buildings
- **UI Improvements**: Made LIHTC expandable sections fully clickable (entire box) instead of just text headers for better user experience
- **Content Updates**: Updated floor plans button text to "View All Floor Plans / Availability" to better reflect page functionality

## Changelog

### July 11, 2025 - Phone Number Update & Enhanced Email Confirmation System
- **Phone Number Update**: Updated site-wide phone number to (816) 323-8797 across all pages and call buttons
- **Enhanced Email Confirmation**: Implemented automatic confirmation emails sent to users after contact form submission
- **Professional Email Templates**: Updated confirmation emails with complete property contact information including:
  - Phone: (816) 323-8797 with clickable link
  - Email: bicycleclub-w@m.knck.io with "Email Us" link
  - Address: 7909 North Granby Avenue, Kansas City, MO 64151
  - Office Hours: Complete schedule with Mon-Fri, Wed extended hours, Sat limited hours, Sun closed
- **Dual Email System**: Both notification emails to property management AND confirmation emails to users now working
- **Gallery UX Enhancement**: Removed filename display from gallery photo popups for cleaner presentation
- **Gallery Photo Organization**: Re-sorted all 35 photos in specified order: Interior (12), Community (15), Pool (5), Fitness Center (3)
- **Dependency Cleanup**: Removed SendGrid references and dependencies, streamlined to use only Postmark SMTP

#### Technical Implementation
- **Email Configuration**: Postmark SMTP integration with dual email delivery system
- **Contact Information**: Updated constants file with new phone number propagated to all components
- **Email Templates**: Professional HTML templates with responsive design and proper contact formatting
- **Error Handling**: Enhanced error logging and confirmation tracking for email delivery
- **Database Updates**: Verified gallery photo sort order with sequential numbering 1-35
- **Package Management**: Removed @sendgrid/mail dependency, using only nodemailer with Postmark SMTP

### July 15, 2025 - Production Deployment Preparation & Final Optimization
- **Production Build**: Successfully built application with optimized assets (544KB JS, 82KB CSS)
- **Environment Configuration**: All required environment variables verified and configured
- **Security Hardening**: Production-ready security settings with secure sessions and authentication
- **Performance Optimization**: Static asset serving, database connection pooling, and gzip compression
- **Documentation**: Complete deployment guide and production checklist created
- **Hero Image Enhancement**: Reduced overlay opacity for brighter, more vibrant hero background
- **Final Testing**: All core features verified and ready for production deployment

#### Technical Implementation
- **Build Process**: Vite production build with code splitting and asset optimization
- **Server Configuration**: Express server configured for production with static file serving
- **Database Ready**: PostgreSQL schema deployed with all required tables and data
- **Email System**: Postmark SMTP fully configured for contact form notifications
- **Admin System**: Complete admin panel with photo management and rent updates
- **Mobile Optimization**: Responsive design tested across all device sizes

### July 13, 2025 - Location Page Restructuring & Content Organization
- **Property Layout Section**: Moved complete "The Property Layout" section from Floor Plans to Location page
- **Interactive Map Removal**: Removed interactive map from Floor Plans page to reduce clutter
- **Content Consolidation**: Location page now contains property location info, site map, and community features
- **Page Focus**: Floor Plans page now focused exclusively on apartment layouts and specifications
- **Enhanced Navigation**: Better content organization with property location details centralized
- **Layout Optimization**: Repositioned Property Layout section to appear immediately after Schedule Visit button
- **Content Flow**: Improved user journey from location → scheduling → property layout → nearby amenities

#### Technical Implementation
- **Component Transfer**: Moved entire Property Layout section including site map image and community features
- **Import Updates**: Added Dialog components and Expand icon to Location page
- **Content Flow**: Positioned Property Layout section after Schedule Visit button for logical progression
- **Map Integration**: Site map dialog functionality preserved in new location
- **Duplicate Removal**: Eliminated duplicate Property Layout section to prevent confusion
- **Section Ordering**: Optimized page structure for better user experience flow

### July 11, 2025 - eplQ Ranking Image Addition & Home Page Enhancement
- **eplQ Ranking Display**: Added eplQ City Rank #1, State Rank #16 image to home page under welcome paragraph
- **Image Integration**: Positioned ranking image with centered alignment between welcome text and main content
- **Broken Image Cleanup**: Removed broken "Bike Club Image" section that was displaying placeholder icon
- **Image Sizing**: Optimized eplQ image size to `h-16` (64px) for proper visual balance
- **Content Flow**: Streamlined home page content from welcome text directly to main amenities section
- **Visual Enhancement**: Added professional ranking credibility to home page without cluttering layout

#### Technical Implementation
- **Image Asset**: Saved ranking image as `/public/images/eplq-ranking.png` from user attachment
- **Component Update**: Added eplQ image section to home page with proper alt text and responsive sizing
- **Cleanup**: Removed broken `/images/bike-club.png` reference that was causing 404 errors
- **Styling**: Used Tailwind classes for centered positioning and consistent spacing

### July 11, 2025 - Complete Gallery Photo Consolidation & Loading Fix
- **Photo Storage Consolidation**: Consolidated all gallery photos to single `/public/images/gallery/` directory
- **Database Path Updates**: Updated all 34 gallery image references to use consistent `/images/gallery/bicycleclub-XX.jpg` format
- **Broken Reference Cleanup**: Removed 3 broken database entries for non-existent image files
- **Duplicate Image Resolution**: Fixed duplicate image references by assigning unique files to each gallery entry
- **File Extension Correction**: Fixed bicycleclub-35.png extension mismatch in database reference
- **Gallery Loading Restored**: All 31 gallery images now load correctly on Gallery page
- **Path Standardization**: Eliminated subdirectory references (interior/, community/, amenities/) in favor of flat structure
- **Performance Optimization**: Reduced database queries by removing orphaned image records

#### Technical Implementation
- **Database Migration**: Updated `gallery_images` table to reference actual file paths in consolidated directory
- **File Mapping**: Mapped database IDs to sequential bicycleclub-01.jpg through bicycleclub-35.png files
- **Validation**: Verified all image URLs return HTTP 200 status codes
- **Cleanup**: Removed broken references to bicycleclub-36.jpg, bicycleclub-37.jpg, bicycleclub-38.jpg

### July 10, 2025 - Admin Photo Gallery Management Improvements
- **Error Prevention**: Added validation to filter out updates for non-existent images
- **State Cleanup**: Automatically removes pending updates when images are deleted
- **Robust Photo Updates**: Prevents crashes when updating deleted images
- **Enhanced User Experience**: Smoother admin interface operation with better error handling
- **Validation Logic**: Checks current image IDs before processing batch updates
- **Cleanup Mechanism**: Removes orphaned pending updates from component state

#### Technical Implementation
- **Photo Update Filtering**: Validates image existence before processing updates
- **Automatic Cleanup**: Removes pending updates for deleted images from state
- **Error Prevention**: Handles edge cases in photo management workflow
- **State Consistency**: Maintains clean update tracking after deletions

### July 10, 2025 - Postmark Email Integration Complete & Production Ready
- **Email System Migration**: Successfully migrated from ProofPoint SMTP to Postmark for reliable email delivery
- **Postmark Configuration**: Configured Postmark SMTP with proper authentication using server token
- **Email Delivery Restored**: Contact form notifications now successfully deliver to specified notification email
- **Production Validation**: Confirmed email system working in production environment with message ID tracking
- **Email Templates**: Updated email templates to use proper `manager@bicycleclubapts.com` sender address
- **SMTP Reliability**: Resolved all previous relay access issues with dedicated transactional email service
- **Contact Form Complete**: Full contact form functionality now operational - captures data AND sends notifications
- **Professional Email Service**: Postmark provides better deliverability and tracking than corporate SMTP

#### Technical Implementation
- **SMTP Configuration**: Updated nodemailer transporter to use `smtp.postmarkapp.com` on port 587
- **Authentication**: Uses `POSTMARK_SERVER_TOKEN` environment variable for secure API authentication
- **Sender Address**: Configured professional sender address `manager@bicycleclubapts.com`
- **Email Templates**: Maintained existing HTML email templates with Postmark compatibility
- **Error Handling**: Proper error handling and success logging with Postmark message IDs

### July 10, 2025 - Critical Admin Authentication Fix & Anchor Navigation Enhancement
- **Admin Session Middleware Fix**: Resolved critical TypeError "Cannot set properties of undefined (setting 'isAdmin')" by adding missing express-session middleware to routes
- **Production Authentication Restored**: Fixed admin login functionality in production environment with proper session configuration
- **Security Enhancement**: Removed diagnostic endpoint `/api/admin/debug` from production for security compliance
- **Session Security Configuration**: Added proper cookie settings with secure flags, httpOnly protection, and 24-hour session duration
- **Anchor Navigation Fix**: Corrected `/#amenities` anchor link to scroll to proper "AMENITIES" section instead of "ACCOMMODATIONS" section
- **Smooth Scrolling Implementation**: Added JavaScript-based anchor scrolling with 100ms delay for proper content loading
- **Duplicate ID Resolution**: Removed conflicting anchor IDs to ensure single, correct scroll target
- **Admin System Fully Operational**: Confirmed complete functionality of gallery management, rent updates, promotional banners, and home page ad system

#### Technical Details
- **Session Middleware**: Added express-session configuration with environment-specific security settings
- **Anchor Positioning**: Moved `id="amenities"` from line 315 to line 249 targeting apartment features section
- **Error Resolution**: Fixed "Cannot set properties of undefined" error that was blocking admin authentication
- **Production Validation**: Verified admin password "Everest200$" works correctly with proper character encoding

### July 10, 2025 - Content Enhancement & Nature-Focused Design Updates
- **Modern Card Design**: Converted all amenities bullet points to modern card components with emoji icons and descriptions
- **Responsive Layout Optimization**: Updated photo positioning for mobile - photo appears below text on mobile, to side on desktop
- **Content Refinement**: Updated welcome text to emphasize natural setting, mature trees, and specific apartment features
- **Accommodations Text Update**: Enhanced description to highlight active lifestyle and community features
- **Nature Meets City Section**: Replaced "Luxury Amenities" with "Nature Meets City" theme focusing on North Platte Brook Park
- **Park Feature Integration**: Added cards for walking/biking trails, athletic fields, picnic shelters, and natural surroundings
- **UI Cleanup**: Removed redundant "Explore All Amenities" button for cleaner navigation flow

### July 10, 2025 - Navigation Restructuring & Amenities Page Consolidation
- **Content Consolidation**: Moved entire Amenities page content to new section on Home page above existing amenities
- **Anchor Navigation**: Updated "Amenities" navigation link to use anchor-based navigation (`/#amenities`) instead of separate page
- **Page Removal**: Removed separate `/amenities` route and page file as content now lives on home page
- **Photo Slider Integration**: Preserved amenities photo slider functionality within home page section
- **Navigation Enhancement**: Enhanced navbar to handle both anchor links and regular routes properly
- **Mobile Navigation**: Updated mobile menu to support anchor links with proper URL handling
- **Smooth Scrolling**: Amenities section now accessible via anchor link with proper scroll positioning

### July 10, 2025 - Home Page Advertisement System Implementation & Final Optimization
- **Complete Ad Management System**: Full CRUD operations for home page advertisements in admin panel
- **Smart Display Logic**: Configurable display frequency (every X visits) with localStorage visit tracking
- **Sliding Advertisement UI**: Left-side popup slider that enters from left edge, expandable/collapsible design
- **Date Range Scheduling**: Optional start/end date controls for time-limited campaigns
- **Admin Panel Integration**: Third tab in admin interface for creating, managing, and toggling ad status
- **Edit Functionality**: Complete edit mode for existing ads with form pre-population and image replacement
- **Image Compression**: Automatic image optimization to max 1200px and 80% quality
- **Database Schema**: New `home_page_ads` table with frequency, scheduling, and status fields
- **API Endpoints**: Complete REST API for ad management (`/api/home-page-ads/*`)
- **Visit Tracking**: Local storage-based visit counter with customizable display frequency
- **Active Status Toggle**: Admin can enable/disable ads with real-time status updates
- **Responsive Design**: Mobile-optimized slider with proper touch interactions
- **Database Storage**: Images stored as compressed base64 data URLs for optimal performance
- **Form Management**: Dynamic form handling for both create and edit modes with proper state reset

#### Final Ad System Optimizations
- **Perfect Display Behavior**: Ad shows expanded for first N visits (based on displayFrequency), then automatically minimizes to persistent tab
- **Clean Interface**: Removed redundant "Learn More" and "Minimize" buttons for streamlined user experience
- **X Button Functionality**: X button properly minimizes ad on all clicks (fixed state synchronization issue)
- **Mobile-First Design**: "Announcement" tab shows full text on desktop, arrow-only on mobile for optimal space usage
- **Persistent State**: Minimized ads remain accessible as clickable tab on left edge for continued engagement

### July 10, 2025 - Complete Admin System & Promotional Banner Implementation
- **Photo Upload System**: Multi-file upload with JPEG and PNG support, drag-and-drop functionality
- **Image Compression**: Automatic compression to max 1200px and 80% quality to handle large files
- **Photo Management**: Secure deletion with confirmation dialog and database cleanup
- **Image Preview**: Instant preview using compressed data URLs for immediate display
- **Photo Ordering**: New uploads automatically added to end of gallery with proper sort order
- **File Input Management**: Automatic clearing of file input after successful upload
- **Uncategorized Filter**: Photos uploaded as "uncategorized" are hidden from public gallery until categorized
- **Payload Handling**: Increased Express server limit to 10MB for large image uploads
- **Admin Security**: Environment variable-based password (ADMIN_PASSWORD secret)
- **Authentication API**: Secure `/api/admin/login` endpoint with session management
- **Password Management**: Configurable admin password through Replit secrets
- **Default Tab**: Rents tab as default for easier rent management

#### Promotional Banner System
- **Database Schema**: Added `promotion_available` and `promo_last_updated` fields to floor plans
- **Admin Controls**: Checkboxes to toggle promotional banners per floor plan
- **Smart Save Button**: "Save Changes" activates for rent OR promotion changes with combined counter
- **Dual Timestamps**: "Rent Last Updated" and "Promo Last Updated" tracked separately
- **API Enhancement**: PATCH `/api/floor-plans/:id` handles both rent and promotion updates independently
- **Frontend Display**: Promotional banners appear next to floor plan names on home page cards
- **State Management**: Proper clearing of both rent and promotion update states after saves
- **Conditional Updates**: Timestamps update only when relevant fields change

#### UI/UX Improvements
- **Logo Enhancement**: Increased header logo size by 20% for better visibility
- **Content Consistency**: Updated all "fitness room" references to "fitness center"
- **Typography Fix**: Adjusted spacing to prevent text cutoff in "Bicycle Club Apartments" heading
- **Banner Positioning**: Promotional banners positioned next to floor plan names for clarity

### July 10, 2025 - Gallery Image Consolidation & Database Optimization
- **File Consolidation**: Merged all gallery images from multiple directories into single `/images/gallery/consolidated/` directory
- **Storage Optimization**: Reduced from 73 files across 8 directories to 36 files in 1 directory, eliminating duplicates
- **Database Updates**: Updated all 35 gallery image references to use consolidated directory structure
- **Directory Cleanup**: Removed redundant directories (`interior/`, `exterior/`, `pool/`, `amenities/`, `community/`, `website-order/`, `exact-order/`)
- **Property Mapping Fix**: Resolved schema mismatch between imageUrl (TypeScript) and image_url (database) causing display issues
- **Gallery Streamlining**: Removed all photo titles and descriptions for clean, minimal image-only display
- **Performance**: All images now load successfully with proper error handling and no missing files

### July 09, 2025 - Gallery Image Loading, Contact Page Font, & Email Updates
- **Image Loading Issue**: Fixed first gallery image not displaying due to problematic image with large gray area
- **Duplicate Prevention**: Resolved duplicate images in gallery by updating first image to use different file
- **Database Updates**: Updated gallery image references to use appropriate interior photos (living room vs bedroom)
- **Error Handling**: Gallery now properly handles images with unusual dimensions or content layouts
- **Font Consistency**: Fixed Contact Us page heading to use same sans-serif font as rest of site
- **UI Polish**: Removed serif font styling from contact page for consistent typography
- **Email Updates**: Changed contact email from manager@bicycleclubapts.com to bicycleclub-w@m.knck.io
- **Email Display**: Updated email text to show "Email Us" instead of full address in contact page and footer

### July 09, 2025 - Gallery Directory Consolidation & Image Management
- **File Organization**: Consolidated all gallery images into single organized directory structure
- **Directory Structure**: Created `/images/gallery/` with category-based subdirectories:
  - `interior/` - 13 apartment interior photos
  - `exterior/` - 7 building exterior and landscape photos  
  - `pool/` - 12 pool and recreational area photos
  - `amenities/` - 3 fitness center photos
  - `community/` - 2 leasing office photos
- **Database Migration**: Updated all 37 image paths in database to reflect new consolidated structure
- **Duplicate Removal**: Removed 60+ duplicate image files using MD5 verification for storage optimization
- **Category Fixes**: Corrected image categorization to match actual content (interior vs exterior, pool vs amenities)
- **Storage Optimization**: Reduced from scattered directories (`/amenities/authentic/`, `/gallery/authentic/`) to clean organized structure
- **Database Recovery**: Resolved database connection issues and restored all authentic Bicycle Club data
- **Path Standardization**: All gallery images now follow consistent path structure: `/images/gallery/{category}/{filename}.jpg`

### July 09, 2025 - ProofPoint Email Integration Complete
- **Email System**: Implemented complete email integration using ProofPoint SMTP
- **Contact Forms**: All contact form submissions now automatically send notifications to kkohorst@everestproperties.com
- **Professional Templates**: Created HTML email templates with contact details and next steps for follow-up
- **Database Integration**: Contact submissions saved to database while emails are sent in parallel
- **SPF Configuration**: Added SPF DNS record for bicycleclubapts.com to improve email deliverability
- **Gallery Navigation**: Added keyboard navigation (arrow keys) and clickable navigation arrows to photo gallery
- **Gallery Counter**: Added image counter showing current position in gallery popup
- **Contact Page**: Removed fax option from contact information as requested

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