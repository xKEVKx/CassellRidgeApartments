# Deployment Guide - Bicycle Club Apartments Website

## 🚀 Quick Deploy Options

### Replit (Recommended)
The project is already optimized for Replit deployment:

1. **Import to Replit**: Fork or import the repository
2. **Set Environment Variables**:
   ```bash
   DATABASE_URL=your_neon_postgresql_url
   ADMIN_PASSWORD=your_secure_admin_password
   ```
3. **Deploy**: Click the "Deploy" button in Replit
4. **Database Setup**: Run `npm run db:push` to initialize schema

### Vercel
For production deployment on Vercel:

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Build Settings**:
   - Framework: Other
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. **Environment Variables**:
   ```bash
   DATABASE_URL=your_neon_postgresql_url
   ADMIN_PASSWORD=your_secure_admin_password
   NODE_ENV=production
   ```

### Railway
For container-based deployment:

1. **Connect Repository**: Link GitHub repository to Railway
2. **Add PostgreSQL**: Deploy Neon or Railway PostgreSQL
3. **Environment Variables**: Set required variables
4. **Deploy**: Automatic deployment on push

## 🗄️ Database Setup

### Neon PostgreSQL (Recommended)
1. **Create Account**: Sign up at [neon.tech](https://neon.tech)
2. **Create Database**: New project with PostgreSQL
3. **Get Connection String**: Copy the connection URL
4. **Configure Environment**: Set `DATABASE_URL` variable
5. **Initialize Schema**: Run `npm run db:push`

### Schema Migration
```bash
# Push schema to database
npm run db:push

# Generate migration files (if needed)
npm run db:generate

# View database in Drizzle Studio
npm run db:studio
```

## 🔧 Environment Configuration

### Required Variables
```bash
# Database Connection
DATABASE_URL=postgresql://username:password@host:port/database

# Admin Security
ADMIN_PASSWORD=your_secure_admin_password

# Application Environment
NODE_ENV=production
```

### Optional Variables
```bash
# Email Configuration (if using custom SMTP)
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password

# Analytics (if integrating)
GOOGLE_ANALYTICS_ID=your_ga_id
```

## 🔒 Security Checklist

### Pre-Deployment
- [ ] Change default admin password
- [ ] Secure database connection string
- [ ] Enable HTTPS in production
- [ ] Set strong session secrets
- [ ] Review CORS settings

### Post-Deployment
- [ ] Test admin login functionality
- [ ] Verify photo upload works
- [ ] Check contact form submission
- [ ] Test all gallery categories
- [ ] Verify responsive design

## 📊 Production Optimization

### Performance Settings
```javascript
// Express optimizations
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

// Database connection pooling
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

### Image Optimization
- Images automatically compressed to 1200px max
- 80% quality JPEG compression
- Data URL storage for instant loading
- Lazy loading in gallery

## 🔍 Monitoring Setup

### Health Checks
```javascript
// Add to routes.ts
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    database: 'connected' 
  });
});
```

### Error Tracking
Consider integrating:
- Sentry for error monitoring
- LogRocket for session replay
- New Relic for performance monitoring

## 📱 Mobile Optimization

### PWA Features
- Service worker for offline capability
- App manifest for mobile installation
- Push notifications for admin updates
- Background sync for form submissions

### Performance Metrics
- First Contentful Paint < 2s
- Largest Contentful Paint < 2.5s
- Cumulative Layout Shift < 0.1
- Time to Interactive < 3s

## 🎯 SEO Configuration

### Meta Tags
```html
<!-- Primary Meta Tags -->
<title>Bicycle Club Apartments - Luxury Living in Kansas City, MO</title>
<meta name="description" content="Discover luxury apartment living at Bicycle Club Apartments in Kansas City. Modern amenities, prime location, and exceptional service.">

<!-- Open Graph -->
<meta property="og:title" content="Bicycle Club Apartments - Luxury Living">
<meta property="og:description" content="Modern luxury apartments in Kansas City, MO">
<meta property="og:image" content="/images/hero-pool-bicycle-club.jpg">
<meta property="og:url" content="https://bicycleclubapartments.com">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Bicycle Club Apartments">
<meta name="twitter:description" content="Luxury apartments in Kansas City, MO">
<meta name="twitter:image" content="/images/hero-pool-bicycle-club.jpg">
```

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run db:push
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

## 📧 Email Configuration

### SMTP Setup
```javascript
// Email configuration
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});
```

## 🧪 Testing Strategy

### Pre-Deployment Testing
```bash
# Run all tests
npm test

# Test database connection
npm run db:test

# Test build process
npm run build

# Test production build locally
npm run preview
```

### Manual Testing Checklist
- [ ] Home page loads correctly
- [ ] Gallery displays all images
- [ ] Floor plans show current pricing
- [ ] Contact forms submit successfully
- [ ] Admin login works
- [ ] Photo upload functions
- [ ] Rent updates save properly
- [ ] Mobile responsive design
- [ ] All navigation links work

## 🎁 Post-Deployment Features

### Analytics Setup
1. **Google Analytics**: Track user behavior
2. **Hotjar**: Understand user interactions
3. **Google Search Console**: Monitor SEO performance

### Backup Strategy
1. **Database Backups**: Daily automated backups
2. **Image Backups**: Cloud storage redundancy
3. **Code Backups**: GitHub repository management

## 📞 Support & Maintenance

### Regular Maintenance
- Monthly security updates
- Database optimization
- Image cleanup and optimization
- Performance monitoring
- User feedback integration

### Contact Information
- **Technical Support**: Contact repository maintainer
- **Content Updates**: Admin panel access required
- **Emergency Issues**: Priority support available

---

**Deployment checklist completed ✅**