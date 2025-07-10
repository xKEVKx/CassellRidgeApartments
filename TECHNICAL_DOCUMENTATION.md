# Technical Documentation - Bicycle Club Apartments

## Architecture Overview

### Frontend Architecture
```
client/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # Base shadcn/ui components
│   │   ├── layout/       # Navigation and layout components
│   │   └── *.tsx         # Feature-specific components
│   ├── pages/            # Route-based page components
│   ├── hooks/            # Custom React hooks
│   └── lib/              # Utilities and configuration
```

### Backend Architecture
```
server/
├── index.ts              # Express server entry point
├── routes.ts             # API route definitions
├── storage.ts            # Database interface and implementation
├── email.ts              # Email service integration
└── vite.ts               # Development server configuration
```

### Shared Schema
```
shared/
└── schema.ts             # Drizzle database schema and types
```

## Database Schema

### Core Tables

#### Users
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL
);
```

#### Floor Plans
```sql
CREATE TABLE floor_plans (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  bedrooms INTEGER NOT NULL,
  bathrooms DECIMAL(2,1) NOT NULL,
  square_feet INTEGER NOT NULL,
  rent INTEGER NOT NULL,
  image_url TEXT,
  rent_last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  promotion_available BOOLEAN DEFAULT FALSE,
  promo_last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Gallery Images
```sql
CREATE TABLE gallery_images (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200),
  description TEXT,
  image_url TEXT NOT NULL,
  category VARCHAR(50),
  sort_order INTEGER DEFAULT 0
);
```

#### Contact Submissions
```sql
CREATE TABLE contact_submissions (
  id SERIAL PRIMARY KEY,
  type VARCHAR(50) NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  floor_plan VARCHAR(100),
  move_in_date DATE,
  message TEXT,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Home Page Ads
```sql
CREATE TABLE home_page_ads (
  id SERIAL PRIMARY KEY,
  image_url TEXT NOT NULL,
  display_frequency INTEGER DEFAULT 5,
  start_date DATE,
  end_date DATE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoints

### Floor Plans
- `GET /api/floor-plans` - Retrieve all floor plans
- `GET /api/floor-plans/:id` - Get specific floor plan
- `PATCH /api/floor-plans/:id` - Update floor plan (rent/promotion)

### Gallery
- `GET /api/gallery` - Retrieve gallery images (with optional category filter)
- `POST /api/gallery` - Upload new images
- `PATCH /api/gallery/:id` - Update image details
- `DELETE /api/gallery/:id` - Delete image
- `PUT /api/gallery/reorder` - Update image sort order

### Contact System
- `POST /api/contact` - Submit contact form
- `GET /api/contact-submissions` - Retrieve submissions (admin)

### Home Page Ads
- `GET /api/home-page-ads` - Get all ads (admin)
- `GET /api/home-page-ads/active` - Get active ad for display
- `POST /api/home-page-ads` - Create new ad
- `PATCH /api/home-page-ads/:id` - Update ad
- `DELETE /api/home-page-ads/:id` - Delete ad

### Admin Authentication
- `POST /api/admin/login` - Admin login with session creation

## Key Components

### Home Page Ad Slider
```typescript
interface HomePageAdSliderProps {
  isVisible: boolean;
  onClose: () => void;
  initialMinimized?: boolean;
}
```

**Features:**
- Smart display logic based on visit frequency
- Responsive design (text on desktop, arrow on mobile)
- Smooth slide animations with backdrop
- Persistent minimized state management

### Admin Interface
```typescript
// Three-tab admin system:
// 1. Rent Management - Real-time rent updates
// 2. Gallery Management - Photo upload/organization  
// 3. Advertisement Management - Home page ad CRUD
```

**Features:**
- Secure authentication with environment-based password
- Real-time form validation and feedback
- Image compression and optimization
- Change tracking with timestamps

### Contact Form System
```typescript
interface ContactFormProps {
  type?: string;
  title?: string;
  className?: string;
}
```

**Features:**
- Multi-purpose forms (general contact, visit scheduling)
- Zod validation with error handling
- Email integration with HTML templates
- Database persistence with admin viewing

## State Management

### React Query Configuration
```typescript
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000,   // 10 minutes
    },
  },
});
```

### Key Query Patterns
- Hierarchical cache keys for efficient invalidation
- Optimistic updates for immediate UI feedback
- Background refetching for data freshness
- Error boundaries for graceful failure handling

## Image Management

### Compression Pipeline
1. **File Upload**: Accept JPEG/PNG files via drag-drop or file input
2. **Client-side Compression**: Resize to max 1200px width, 80% quality
3. **Base64 Encoding**: Convert to data URL for database storage
4. **Database Storage**: Store as TEXT field for immediate access

### Gallery Organization
```
/images/gallery/consolidated/
├── interior/     # Apartment interior photos
├── exterior/     # Building and landscape photos
├── pool/         # Pool and recreational areas
├── amenities/    # Fitness center and amenities
└── community/    # Leasing office and common areas
```

## Email Integration

### ProofPoint SMTP Configuration
- **Service**: ProofPoint email routing
- **Templates**: HTML email templates with styling
- **Recipients**: kkohorst@everestproperties.com
- **Features**: Contact form notifications, visit scheduling confirmations

### Email Template Structure
```html
<div style="font-family: Arial, sans-serif; max-width: 600px;">
  <h2>New Contact Submission - Bicycle Club Apartments</h2>
  <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
    <!-- Contact details and form data -->
  </div>
</div>
```

## Performance Optimizations

### Database
- Indexed foreign keys for efficient joins
- Connection pooling with Neon serverless
- Optimized queries with proper SELECT field specification

### Frontend
- Code splitting with Vite's automatic chunking
- Image lazy loading and compression
- Efficient re-renders with React Query caching
- Mobile-first responsive design patterns

### Build Process
- TypeScript compilation with strict mode
- Tailwind CSS purging for minimal bundle size
- Vite's optimized bundling and tree shaking
- Environment-specific builds (dev/production)

## Security Measures

### Authentication
- Environment variable-based admin password
- Session-based authentication with PostgreSQL storage
- CSRF protection via session validation

### Data Validation
- Zod schemas for all form inputs
- Server-side validation for all API endpoints
- SQL injection prevention via Drizzle ORM
- File upload restrictions (JPEG/PNG only, size limits)

### Environment Security
- Sensitive data in environment variables
- Database URL encryption in production
- HTTPS enforcement for production deployments

## Development Workflow

### Local Setup
```bash
# Install dependencies
npm install

# Start development server (frontend + backend)
npm run dev

# Database operations
npm run db:push     # Apply schema changes
npm run db:studio   # Open database GUI
```

### Code Quality
- TypeScript strict mode for type safety
- ESLint configuration for code consistency
- Prettier formatting for code style
- Git hooks for pre-commit validation

### Testing Strategy
- Component testing with React Testing Library
- API endpoint testing with supertest
- Database testing with in-memory PostgreSQL
- E2E testing with Playwright (recommended)

## Deployment Considerations

### Environment Variables
```env
DATABASE_URL=postgresql://...
ADMIN_PASSWORD=secure_password
NODE_ENV=production
```

### Build Configuration
- Vite production build optimization
- Static asset handling and caching
- Environment-specific database connections
- SMTP configuration for email services

### Hosting Requirements
- Node.js runtime (v18+)
- PostgreSQL database access
- Static file serving capability
- Environment variable configuration
- SSL/TLS certificate support

This technical documentation provides comprehensive coverage of the system architecture, implementation details, and operational considerations for the Bicycle Club Apartments platform.