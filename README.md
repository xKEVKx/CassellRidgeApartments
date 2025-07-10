# Bicycle Club Apartments - Website & Admin Management System

A comprehensive full-stack web application for Bicycle Club Apartments in Kansas City, Missouri. This modern luxury apartment complex website features interactive property listings, photo galleries, and a powerful admin management system.

## 🏢 About

Bicycle Club Apartments is a luxury apartment complex offering modern living spaces with premium amenities. This website serves as the primary marketing and leasing platform, providing potential residents with detailed information about floor plans, amenities, and the surrounding area.

## ✨ Key Features

### Public Website
- **Modern Design**: Ultra-modern luxury apartment website with contemporary gradients and glass effects
- **Interactive Floor Plans**: Detailed apartment layouts with pricing and scheduling capabilities
- **Photo Gallery**: High-quality images organized by category with lightbox functionality
- **Contact System**: Multiple contact forms with email integration and lead capture
- **Virtual Tours**: Integration with YouTube property videos
- **Location Information**: Interactive maps and nearby attractions

### Admin Management System
- **Photo Management**: Complete CRUD operations for gallery images
- **Multi-file Upload**: Drag-and-drop interface with JPEG/PNG support
- **Image Compression**: Automatic resizing and compression for optimal performance
- **Rent Management**: Real-time pricing updates with timestamp tracking
- **Secure Authentication**: Environment variable-based password protection
- **Categorization System**: Organize photos by interior, exterior, pool, and amenities

## 🛠 Technical Architecture

### Frontend
- **React 18** with TypeScript for type safety
- **Vite** for fast development and optimized builds
- **Tailwind CSS** with custom design system
- **Radix UI** components for accessibility
- **React Hook Form** with Zod validation
- **TanStack Query** for server state management

### Backend
- **Node.js** with Express.js server
- **PostgreSQL** database with Neon serverless hosting
- **Drizzle ORM** for type-safe database operations
- **File Upload** handling with automatic compression
- **RESTful API** design with proper error handling

### Database Schema
- **Users**: Authentication and admin management
- **Floor Plans**: Apartment layouts with pricing and availability
- **Gallery Images**: Photo management with categories and ordering
- **Amenities**: Property features organized by type
- **Contact Submissions**: Lead capture and inquiry management

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (Neon recommended)
- Environment variables configured

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   # Database
   DATABASE_URL=your_postgresql_connection_string
   
   # Admin Security
   ADMIN_PASSWORD=your_secure_admin_password
   ```
4. Initialize the database:
   ```bash
   npm run db:push
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

### Database Setup
The application uses Drizzle ORM with PostgreSQL. The database schema includes:
- Floor plans with pricing and specifications
- Gallery images with categories and ordering
- Amenities organized by type
- Contact submissions for lead management

## 🎨 Design System

### Color Palette
- **Primary**: Emerald/teal gradients for luxury branding
- **Secondary**: Natural earth tones reflecting Kansas City
- **Accent**: Modern glass effects and backdrop filters

### Typography
- **Headings**: Bold, contemporary font hierarchy
- **Body**: Clean, readable sans-serif
- **Special**: Gradient text effects for emphasis

### Components
- Glass-effect navigation with backdrop blur
- Floating cards with sophisticated shadows
- Interactive hover animations and micro-interactions
- Responsive design optimized for all devices

## 🔧 Admin Panel Features

### Photo Management
- **Upload**: Multi-file drag-and-drop with instant preview
- **Compression**: Automatic resizing to 1200px max with 80% quality
- **Organization**: Category-based sorting and manual reordering
- **Deletion**: Safe removal with confirmation dialogs

### Rent Management
- **Real-time Updates**: Instant pricing changes with timestamp tracking
- **Pacific Time Display**: Readable timestamp format
- **Validation**: Numeric input validation with error handling

### Security
- **Environment Variables**: Secure password management
- **Session Management**: Persistent authentication
- **Access Control**: Protected admin routes

## 📱 Mobile Optimization

- Responsive design working on all screen sizes
- Touch-friendly navigation and interactions
- Optimized image loading for mobile networks
- Progressive web app capabilities

## 🔒 Security Features

- Environment-based configuration
- Secure admin authentication
- Protected API endpoints
- Data validation and sanitization
- SQL injection prevention through ORM

## 🌐 Deployment

The application is designed for easy deployment on platforms like:
- **Replit**: Native integration with automatic deployments
- **Vercel**: Full-stack deployment with database integration
- **Railway**: Container-based deployment with PostgreSQL

### Environment Variables Required
```bash
DATABASE_URL=postgresql://...
ADMIN_PASSWORD=your_secure_password
NODE_ENV=production
```

## 📊 Performance Optimizations

- **Image Compression**: Automatic resizing and quality optimization
- **Database Indexing**: Optimized queries for fast loading
- **Caching**: TanStack Query for efficient data fetching
- **Code Splitting**: Lazy loading for optimal bundle sizes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary software developed for Bicycle Club Apartments. All rights reserved.

## 🏗 Architecture Decisions

### Why This Stack?
- **React + TypeScript**: Type safety and modern development experience
- **Drizzle ORM**: Type-safe database operations with excellent TypeScript integration
- **Tailwind CSS**: Rapid UI development with consistent design system
- **Neon PostgreSQL**: Serverless database with excellent performance
- **Vite**: Fast development server with optimized production builds

### Database Design
The schema is designed for flexibility and performance:
- Normalized structure preventing data duplication
- Proper indexing for fast queries
- Timestamp tracking for audit trails
- Flexible categorization system

## 📈 Future Enhancements

- **Resident Portal**: Login system for current residents
- **Online Applications**: Digital leasing process
- **Virtual Reality Tours**: 360-degree apartment previews
- **Maintenance Requests**: Online service request system
- **Community Features**: Resident communication platform

## 🔍 Monitoring & Analytics

- Error tracking and performance monitoring
- User behavior analytics
- Admin activity logging
- Database performance metrics

---

**Built with ❤️ for Bicycle Club Apartments**