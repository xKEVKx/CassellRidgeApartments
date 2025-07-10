# Project Structure - Bicycle Club Apartments

## 📁 Directory Overview

```
bicycle-club-apartments/
├── client/                     # Frontend React application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── contact-form.tsx
│   │   │   ├── schedule-visit-modal.tsx
│   │   │   └── ui/             # Shadcn/ui components
│   │   ├── hooks/              # Custom React hooks
│   │   │   ├── use-mobile.tsx
│   │   │   └── use-toast.ts
│   │   ├── lib/                # Utility functions and configs
│   │   │   ├── constants.ts    # Site configuration
│   │   │   ├── queryClient.ts  # React Query setup
│   │   │   └── utils.ts        # Helper functions
│   │   ├── pages/              # Page components
│   │   │   ├── admin.tsx       # Admin management panel
│   │   │   ├── amenities.tsx   # Amenities showcase
│   │   │   ├── contact.tsx     # Contact information
│   │   │   ├── floor-plans.tsx # Apartment layouts
│   │   │   ├── gallery.tsx     # Photo gallery
│   │   │   ├── home.tsx        # Homepage
│   │   │   ├── location.tsx    # Location information
│   │   │   ├── not-found.tsx   # 404 page
│   │   │   └── virtual-tours.tsx # Virtual tours
│   │   ├── App.tsx             # Main application component
│   │   ├── main.tsx            # React entry point
│   │   └── index.css           # Global styles
├── server/                     # Backend Express application
│   ├── db.ts                   # Database connection
│   ├── email.ts                # Email functionality
│   ├── index.ts                # Server entry point
│   ├── routes.ts               # API routes
│   ├── storage.ts              # Database operations
│   └── vite.ts                 # Vite integration
├── shared/                     # Shared type definitions
│   └── schema.ts               # Database schema and types
├── public/                     # Static assets
│   └── images/                 # Image assets
│       ├── gallery/
│       │   └── consolidated/   # Gallery images
│       ├── floor-plans/        # Floor plan images
│       └── amenities/          # Amenity images
├── attached_assets/            # Development assets
├── docs/                       # Documentation
│   ├── README.md              # Main documentation
│   ├── DEPLOYMENT.md          # Deployment guide
│   ├── RECENT_CHANGES.md      # Change log
│   └── COMMIT_MESSAGES.md     # Commit history
├── package.json               # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── vite.config.ts            # Vite build configuration
├── drizzle.config.ts         # Database ORM configuration
└── replit.md                 # Project documentation
```

## 🏗️ Architecture Layers

### Frontend (client/)
**Framework**: React 18 with TypeScript
**Styling**: Tailwind CSS with custom design system
**State Management**: TanStack Query for server state
**Routing**: Wouter for client-side routing

### Backend (server/)
**Runtime**: Node.js with Express.js
**Database**: PostgreSQL with Drizzle ORM
**Authentication**: Session-based admin authentication
**File Handling**: Multi-part uploads with compression

### Shared (shared/)
**Type Safety**: Shared TypeScript definitions
**Schema**: Database schema with Zod validation
**Consistency**: Unified types between frontend and backend

## 🔧 Key Components

### Admin Panel (`client/src/pages/admin.tsx`)
**Features**:
- Photo upload with drag-and-drop
- Image compression and preview
- Rent management with timestamps
- Secure authentication
- Gallery reordering

**Key Functions**:
- `uploadImagesMutation`: Handles multi-file uploads
- `deleteImageMutation`: Secure photo deletion
- `updateRentMutation`: Real-time rent updates
- `handleFileUpload`: File validation and processing

### Gallery System (`client/src/pages/gallery.tsx`)
**Features**:
- Category-based image filtering
- Lightbox functionality
- Keyboard navigation
- Responsive grid layout

**Key Functions**:
- `handleImageClick`: Open lightbox
- `handleKeyDown`: Keyboard navigation
- `handleNext/Previous`: Image navigation

### Database Layer (`server/storage.ts`)
**Pattern**: Repository pattern with interface
**Methods**:
- `getGalleryImages()`: Fetch images with filtering
- `createGalleryImage()`: Add new images
- `updateGalleryImage()`: Edit existing images
- `deleteGalleryImage()`: Remove images
- `updateGalleryImageOrder()`: Reorder images

### API Routes (`server/routes.ts`)
**Endpoints**:
- `GET /api/gallery`: Fetch gallery images
- `POST /api/gallery`: Upload new images
- `PATCH /api/gallery/:id`: Update image details
- `DELETE /api/gallery/:id`: Delete image
- `PATCH /api/gallery/reorder`: Update image order
- `GET /api/floor-plans`: Fetch floor plans
- `PATCH /api/floor-plans/:id`: Update rent prices
- `POST /api/contact`: Submit contact forms
- `POST /api/admin/login`: Admin authentication

## 🎨 Design System

### Color Palette
```css
:root {
  --primary: 158 158 158;      /* Neutral gray */
  --secondary: 20 184 166;     /* Teal */
  --accent: 34 197 94;         /* Green */
  --background: 255 255 255;   /* White */
  --foreground: 23 23 23;      /* Dark gray */
}

.dark {
  --primary: 82 82 82;         /* Dark gray */
  --secondary: 20 184 166;     /* Teal */
  --accent: 34 197 94;         /* Green */
  --background: 23 23 23;      /* Dark */
  --foreground: 250 250 250;   /* Light gray */
}
```

### Typography
```css
/* Headings */
.text-4xl { font-size: 2.25rem; }
.text-3xl { font-size: 1.875rem; }
.text-2xl { font-size: 1.5rem; }
.text-xl { font-size: 1.25rem; }

/* Body text */
.text-base { font-size: 1rem; }
.text-sm { font-size: 0.875rem; }
.text-xs { font-size: 0.75rem; }
```

### Spacing System
```css
/* Margins and padding */
.m-1 { margin: 0.25rem; }
.m-2 { margin: 0.5rem; }
.m-4 { margin: 1rem; }
.m-8 { margin: 2rem; }
.m-16 { margin: 4rem; }

/* Consistent spacing scale */
.space-y-4 > * + * { margin-top: 1rem; }
.space-x-6 > * + * { margin-left: 1.5rem; }
```

## 📊 Data Flow

### Image Upload Process
1. **File Selection**: User selects images in admin panel
2. **Validation**: Check file type (JPEG/PNG) and size
3. **Compression**: Resize to max 1200px, 80% quality
4. **Preview**: Generate data URL for instant preview
5. **Upload**: Send compressed image to server
6. **Storage**: Save to database with metadata
7. **Refresh**: Update gallery display

### Contact Form Submission
1. **Form Validation**: Client-side validation with Zod
2. **API Call**: POST to `/api/contact` endpoint
3. **Database Storage**: Save submission details
4. **Email Notification**: Send confirmation emails
5. **User Feedback**: Display success/error message

### Admin Authentication
1. **Password Entry**: User enters admin password
2. **API Verification**: POST to `/api/admin/login`
3. **Session Storage**: Save authentication state
4. **Route Protection**: Protect admin routes
5. **Logout**: Clear session and redirect

## 🔒 Security Implementation

### Environment Variables
```bash
# Required for production
DATABASE_URL=postgresql://...
ADMIN_PASSWORD=secure_password

# Optional for email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password
```

### Input Validation
```typescript
// Zod schemas for validation
export const insertGalleryImageSchema = createInsertSchema(galleryImages).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
```

### SQL Injection Prevention
```typescript
// Using Drizzle ORM with prepared statements
const images = await db.select().from(galleryImages).where(eq(galleryImages.category, category));
```

## 🚀 Performance Optimizations

### Image Optimization
- Automatic compression to 1200px maximum
- 80% JPEG quality for optimal file size
- Lazy loading in gallery components
- Data URL caching for instant previews

### Database Optimization
- Proper indexing on frequently queried columns
- Connection pooling for efficient resource usage
- Prepared statements for SQL injection prevention
- Batch operations for bulk updates

### Frontend Optimization
- React Query for intelligent caching
- Code splitting with dynamic imports
- Optimized bundle size with tree shaking
- CSS purging for minimal stylesheet

## 📱 Mobile Responsiveness

### Breakpoints
```css
/* Tailwind CSS breakpoints */
sm: 640px    /* Small devices */
md: 768px    /* Medium devices */
lg: 1024px   /* Large devices */
xl: 1280px   /* Extra large devices */
2xl: 1536px  /* 2X large devices */
```

### Mobile-First Design
- Touch-friendly buttons and navigation
- Responsive grid layouts
- Optimized image loading
- Swipe gestures for gallery navigation

## 🔄 State Management

### React Query Configuration
```typescript
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});
```

### Local State Management
- React hooks for component state
- SessionStorage for authentication
- LocalStorage for user preferences
- URL parameters for navigation state

## 📝 Development Workflow

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Prettier for consistent formatting
- Husky for pre-commit hooks

### Testing Strategy
- Unit tests for utility functions
- Integration tests for API endpoints
- E2E tests for critical user flows
- Manual testing checklist

### Build Process
```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Database
npm run db:push      # Push schema changes
npm run db:studio    # Open database browser
```

---

**Project structure designed for scalability and maintainability** 🏗️