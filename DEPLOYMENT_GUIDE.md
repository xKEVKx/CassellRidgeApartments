# Bicycle Club Apartments - Production Deployment Guide

## Pre-Deployment Checklist

### ✅ Core Features Verified
- [x] Contact form with dual email system (notifications + confirmations)
- [x] Gallery with 35 organized photos (Interior: 12, Community: 15, Pool: 5, Fitness: 3)
- [x] Floor plans with promotional banners and rent management
- [x] Admin panel with photo upload, rent updates, and home page ads
- [x] Location page with property layout and interactive maps
- [x] Virtual tours integration
- [x] Responsive design for mobile/desktop

### ✅ Security Configuration
- [x] Admin authentication with secure session management
- [x] Environment variables for all sensitive data
- [x] HTTPS-ready configuration
- [x] Secure cookie settings for production
- [x] API rate limiting through middleware

### ✅ Performance Optimization
- [x] Vite build optimization (82KB CSS, 544KB JS)
- [x] Image compression for gallery uploads
- [x] Database connection pooling
- [x] Static asset caching
- [x] Gzip compression ready

### ✅ Required Environment Variables
- [x] `DATABASE_URL` - PostgreSQL connection string
- [x] `ADMIN_PASSWORD` - Admin panel access
- [x] `NOTIFICATION_EMAIL` - Contact form notifications
- [x] `POSTMARK_SERVER_TOKEN` - Email delivery service
- [x] `NODE_ENV=production` - Production mode

## Deployment Steps

### 1. Build Application
```bash
npm run build
```
This creates:
- `dist/index.js` - Production server bundle
- `dist/public/` - Static assets and HTML
- `dist/public/assets/` - Optimized CSS and JS

### 2. Production Server Start
```bash
NODE_ENV=production node dist/index.js
```
Server will start on port 5000 with:
- Static file serving from `dist/public/`
- API routes on `/api/*`
- Database connections via connection pooling
- Email service integration

### 3. Database Setup
Ensure PostgreSQL database is accessible and run:
```bash
npm run db:push
```
This syncs the schema with tables:
- `users` - Admin authentication
- `floor_plans` - Apartment layouts and pricing
- `amenities` - Property features
- `gallery_images` - Photo management
- `contact_submissions` - Lead capture
- `home_page_ads` - Marketing campaigns

### 4. DNS & SSL Configuration
- Point domain to server IP
- Configure SSL certificate
- Update `SITE_CONFIG` in `client/src/lib/constants.ts` if needed

## Post-Deployment Verification

### Test Core Functionality
1. **Homepage**: Verify hero image, floor plans, and ad system
2. **Contact Forms**: Test email delivery and database storage
3. **Gallery**: Confirm all 35 photos load correctly
4. **Admin Panel**: Test login, photo upload, and rent management
5. **Location Page**: Verify map integration and property layout
6. **Mobile Responsiveness**: Test on various screen sizes

### Monitor Performance
- Database connection health
- Email delivery rates
- Page load times
- Error logging

## Maintenance Tasks

### Regular Updates
- Monitor contact form submissions
- Update rent prices seasonally
- Refresh gallery photos as needed
- Review promotional banners

### Admin Functions
- Access admin panel at `/admin`
- Password: Use `ADMIN_PASSWORD` environment variable
- Manage gallery photos, rents, and home page ads

## Technical Architecture

### Frontend (React + Vite)
- Modern component architecture
- TanStack Query for API state management
- Tailwind CSS for styling
- Responsive design with mobile-first approach

### Backend (Node.js + Express)
- RESTful API design
- PostgreSQL with Drizzle ORM
- Session-based authentication
- Postmark SMTP for email delivery

### Database (PostgreSQL)
- Neon serverless PostgreSQL
- Connection pooling for performance
- Automatic schema migrations
- Secure environment variable configuration

## Support & Troubleshooting

### Common Issues
1. **Email not sending**: Check `POSTMARK_SERVER_TOKEN` configuration
2. **Database connection**: Verify `DATABASE_URL` format
3. **Admin access**: Confirm `ADMIN_PASSWORD` is set
4. **Static assets**: Ensure `dist/public` exists after build

### Logs & Monitoring
- Server logs available via console output
- Database queries logged in development
- Email delivery tracking via Postmark dashboard

## Security Considerations

### Production Security
- Environment variables for all secrets
- Secure session configuration
- HTTPS enforcement
- Admin panel access control
- Input validation and sanitization

### Data Protection
- Contact form data encrypted in transit
- Database connections secured
- Admin sessions with secure cookies
- File upload validation and size limits

---

**Deployment Ready**: All systems verified and optimized for production use.
**Last Updated**: July 15, 2025
**Version**: 1.0.0 Production