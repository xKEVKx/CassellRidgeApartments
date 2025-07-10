# Deployment Guide - Bicycle Club Apartments

## Overview

This guide covers deployment of the Bicycle Club Apartments website, a full-stack React/Node.js application with PostgreSQL database and advanced admin features.

## Prerequisites

### Required Services
- **Database**: PostgreSQL (Neon, AWS RDS, or similar)
- **Hosting**: Node.js hosting (Vercel, Railway, Render, etc.)
- **Email**: SMTP service for contact form notifications
- **Domain**: Custom domain (optional)

### Environment Variables
```env
# Database Configuration
DATABASE_URL=postgresql://username:password@host:port/database

# Admin Authentication
ADMIN_PASSWORD=your_secure_admin_password

# Application Environment
NODE_ENV=production

# Email Configuration (if different from default)
SMTP_HOST=your.smtp.host
SMTP_PORT=587
SMTP_USER=your_email@domain.com
SMTP_PASS=your_email_password
```

## Database Setup

### 1. Create PostgreSQL Database
Choose one of these options:

#### Option A: Neon (Recommended)
1. Visit [neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string
4. Set as `DATABASE_URL` environment variable

#### Option B: Railway
1. Visit [railway.app](https://railway.app)
2. Create new project
3. Add PostgreSQL service
4. Copy connection string from settings

#### Option C: Self-hosted
1. Install PostgreSQL
2. Create database: `createdb bicycle_club_apartments`
3. Create connection string: `postgresql://user:pass@localhost:5432/bicycle_club_apartments`

### 2. Initialize Database Schema
```bash
# Install dependencies
npm install

# Push schema to database
npm run db:push

# Verify tables created
npm run db:studio
```

## Application Deployment

### Option 1: Vercel (Recommended)

#### Steps:
1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy from project directory
   vercel
   ```

2. **Configure Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Set Environment Variables**
   ```
   DATABASE_URL=your_postgresql_url
   ADMIN_PASSWORD=your_admin_password
   NODE_ENV=production
   ```

4. **Deploy**
   ```bash
   vercel --prod
   ```

### Option 2: Railway

#### Steps:
1. **Connect Repository**
   - Visit [railway.app](https://railway.app)
   - Create new project from GitHub repo

2. **Configure Variables**
   ```
   DATABASE_URL=your_postgresql_url
   ADMIN_PASSWORD=your_admin_password
   NODE_ENV=production
   ```

3. **Deploy**
   - Railway automatically builds and deploys
   - No additional configuration needed

### Option 3: Render

#### Steps:
1. **Create Web Service**
   - Connect GitHub repository
   - Choose "Web Service"

2. **Build Configuration**
   ```
   Build Command: npm install && npm run build
   Start Command: npm start
   ```

3. **Environment Variables**
   ```
   DATABASE_URL=your_postgresql_url
   ADMIN_PASSWORD=your_admin_password
   NODE_ENV=production
   ```

## Email Configuration

### Default Setup (ProofPoint)
The application is pre-configured for ProofPoint SMTP. Contact form submissions automatically send to: `kkohorst@everestproperties.com`

### Custom Email Setup
1. **Add Environment Variables**
   ```env
   SMTP_HOST=smtp.yourdomain.com
   SMTP_PORT=587
   SMTP_USER=noreply@yourdomain.com
   SMTP_PASS=your_email_password
   SMTP_TO=manager@yourdomain.com
   ```

2. **Update Email Configuration** (if needed)
   ```typescript
   // server/email.ts
   const transporter = nodemailer.createTransporter({
     host: process.env.SMTP_HOST,
     port: parseInt(process.env.SMTP_PORT || '587'),
     secure: false,
     auth: {
       user: process.env.SMTP_USER,
       pass: process.env.SMTP_PASS,
     },
   });
   ```

## Admin Access Setup

### 1. Set Admin Password
```env
ADMIN_PASSWORD=YourSecurePassword123!
```

### 2. Access Admin Panel
1. Navigate to: `https://yourdomain.com/admin`
2. Enter admin password
3. Manage floor plans, gallery, and advertisements

### 3. Initial Data Setup

#### Upload Gallery Images
1. Go to Admin → Gallery tab
2. Upload apartment photos (JPEG/PNG)
3. Categorize as: interior, exterior, pool, amenities, community

#### Configure Floor Plans
1. Go to Admin → Rent Management tab
2. Update rent prices as needed
3. Toggle promotional banners

#### Create Home Page Ad
1. Go to Admin → Advertisement Management tab
2. Upload promotional image
3. Set display frequency (recommended: 5 visits)
4. Activate advertisement

## Domain Configuration

### Custom Domain Setup
1. **Purchase Domain** (GoDaddy, Namecheap, etc.)
2. **Configure DNS**
   ```
   Type: CNAME
   Name: www
   Value: your-app.vercel.app (or hosting provider URL)
   
   Type: A
   Name: @
   Value: (hosting provider IP)
   ```

3. **SSL Certificate**
   - Most hosting providers (Vercel, Railway, Render) provide automatic SSL
   - Verify HTTPS works after DNS propagation

### Domain Verification
```bash
# Test domain resolution
nslookup yourdomain.com

# Test HTTPS
curl -I https://yourdomain.com
```

## Performance Optimization

### 1. Image Optimization
- Gallery images are automatically compressed to 1200px max width
- 80% quality compression for optimal loading
- Consider CDN for additional performance (Cloudflare)

### 2. Database Optimization
```sql
-- Add indexes for better performance
CREATE INDEX idx_gallery_category ON gallery_images(category);
CREATE INDEX idx_contact_submitted_at ON contact_submissions(submitted_at);
CREATE INDEX idx_floor_plans_rent ON floor_plans(rent);
```

### 3. Caching Strategy
- Enable browser caching for static assets
- Configure CDN caching rules
- Use database connection pooling

## Monitoring & Maintenance

### 1. Application Monitoring
```bash
# Check application health
curl https://yourdomain.com/api/floor-plans

# Monitor database connections
# Use hosting provider's monitoring tools
```

### 2. Database Maintenance
```sql
-- Regular maintenance queries
VACUUM ANALYZE gallery_images;
VACUUM ANALYZE contact_submissions;

-- Monitor database size
SELECT pg_size_pretty(pg_total_relation_size('gallery_images'));
```

### 3. Log Monitoring
- Review application logs regularly
- Monitor error rates and response times
- Set up alerts for critical issues

## Security Checklist

### Application Security
- ✅ Admin password in environment variables
- ✅ Session-based authentication
- ✅ SQL injection protection via ORM
- ✅ File upload restrictions (JPEG/PNG only)
- ✅ HTTPS enforcement

### Database Security
- ✅ Connection string in environment variables
- ✅ Database user with minimal permissions
- ✅ Regular backups configured
- ✅ SSL connections enabled

### Infrastructure Security
- ✅ Environment variables secured
- ✅ Regular dependency updates
- ✅ Access logs monitoring
- ✅ Firewall rules configured

## Backup Strategy

### 1. Database Backups
```bash
# Manual backup
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql

# Restore backup
psql $DATABASE_URL < backup_20240101.sql
```

### 2. Automated Backups
- Configure hosting provider's backup solution
- Set up daily/weekly backup schedule
- Test restore procedures regularly

### 3. Code Backups
- GitHub repository serves as code backup
- Tag releases for version tracking
- Maintain deployment documentation

## Troubleshooting

### Common Issues

#### Database Connection Errors
```bash
# Test database connection
psql $DATABASE_URL -c "SELECT version();"

# Check connection string format
# postgresql://user:pass@host:port/database
```

#### Email Delivery Issues
```bash
# Test SMTP connection
telnet smtp.yourdomain.com 587

# Check email logs in application
# Verify recipient email address
```

#### Admin Login Issues
```bash
# Verify admin password environment variable
echo $ADMIN_PASSWORD

# Clear browser cookies/session
# Check browser developer tools for errors
```

### Performance Issues
1. **Slow Database Queries**
   - Review query performance
   - Add appropriate indexes
   - Optimize image sizes

2. **High Memory Usage**
   - Monitor application memory
   - Optimize image compression
   - Review query result sizes

3. **Slow Page Loads**
   - Enable gzip compression
   - Optimize image delivery
   - Configure CDN caching

## Support & Updates

### Regular Updates
1. **Dependencies**: Update npm packages monthly
2. **Security**: Apply security patches immediately
3. **Features**: Deploy new features through staging environment

### Getting Help
- Review application logs for error details
- Check hosting provider documentation
- Contact development team for custom issues

This deployment guide provides comprehensive instructions for setting up and maintaining the Bicycle Club Apartments website in production environments.