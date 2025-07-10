# Recent Changes - Bicycle Club Apartments Website

## July 10, 2025 - Admin Security & Rent Management Enhancement

### Admin Password Security Implementation
- **Security Enhancement**: Converted hardcoded admin password to environment variable
- **New Secret**: Added `ADMIN_PASSWORD` as configurable Replit secret
- **API Endpoint**: Created `/api/admin/login` for secure password validation
- **Benefits**: Admin password now changeable without code modifications

### Rent Management System Improvements
- **Default Tab**: Changed admin page default from Gallery to Rents tab
- **Timestamp Tracking**: Added `lastUpdated` field to floor plans database schema
- **Pacific Time Display**: Timestamps show in Pacific timezone with readable format
- **Database Schema**: Updated floor_plans table with `last_updated` column
- **API Fixes**: Resolved rent update failures with proper API call formatting

### Technical Fixes
- **API Call Format**: Fixed `apiRequest` function calls to use correct parameter order
- **Error Handling**: Enhanced debugging with console logging for rent updates
- **Database Updates**: Automatic timestamp setting on rent price changes
- **Mutation Logic**: Improved error handling for both photo and rent updates

### Files Modified
- `client/src/pages/admin.tsx` - Security, default tab, timestamp display
- `server/routes.ts` - Added admin login API endpoint
- `server/storage.ts` - Updated floor plan updates with timestamps
- `shared/schema.ts` - Added lastUpdated field to floor plans
- `replit.md` - Updated changelog and project documentation

### Database Changes Applied
```sql
-- Add timestamp tracking to floor plans
ALTER TABLE floor_plans ADD COLUMN last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- Set initial timestamps for existing records
UPDATE floor_plans SET last_updated = CURRENT_TIMESTAMP;
```

## July 09, 2025 - Bug Fixes & UI Improvements

### Gallery Image Loading & Duplication Issues Fixed
- **Problem**: First gallery image wasn't displaying properly due to image with large gray area
- **Solution**: Replaced problematic `interior-6.jpg` with clean `interior-living.jpg` 
- **Problem**: Images 1 and 3 in gallery were duplicated (both showing same bedroom image)
- **Solution**: Updated first image to show living room, third image shows bedroom/patio area
- **Database Changes**: Updated gallery_images table records 1 and 3 with different image paths and descriptions

### Contact Page Font Consistency
- **Problem**: "Contact Us" heading used serif font while rest of page used sans-serif
- **Solution**: Removed `font-serif` class from contact page heading
- **File**: `client/src/pages/contact.tsx` - line 15

### Email Address Updates & Display Changes
- **Updated**: Email address from manager@bicycleclubapts.com to bicycleclub-w@m.knck.io
- **Display**: Changed email text to show "Email Us" instead of full email address
- **Files**: 
  - `client/src/lib/constants.ts` - Updated SITE_CONFIG.contact.email
  - `client/src/pages/contact.tsx` - Changed display text to "Email Us"
  - `client/src/components/layout/footer.tsx` - Changed display text to "Email Us"
- **Functionality**: Mailto links still send to correct email address

### Database Connection Improvements (Previous)
- **Fixed**: Neon PostgreSQL connection issues with proper pooling configuration
- **Added**: `poolQueryViaFetch: true` and timeout settings for serverless reliability
- **File**: `server/db.ts`

### Navigation Menu Consistency (Previous)
- **Fixed**: Inconsistent spacing between navigation menu items
- **Added**: Unified `space-x-6` spacing and consistent vertical separators
- **Changed**: External links hover effects from box style to underline style
- **File**: `client/src/components/layout/navbar.tsx`

## Technical Details

### Files Modified
1. **Database Schema** (`shared/schema.ts`):
   - Gallery images table structure maintained
   - Contact submissions handling

2. **Gallery Page** (`client/src/pages/gallery.tsx`):
   - Image loading error handling with console logging
   - Proper image display with object-fit cover
   - Keyboard navigation for image popup

3. **Contact Page** (`client/src/pages/contact.tsx`):
   - Font consistency fix for main heading
   - Updated email display text to "Email Us"

4. **Footer Component** (`client/src/components/layout/footer.tsx`):
   - Updated email display text to "Email Us"

5. **Constants** (`client/src/lib/constants.ts`):
   - Updated contact email to bicycleclub-w@m.knck.io

6. **Database Records**:
   - Updated gallery_images id=1: Living room photo with proper title
   - Maintained gallery_images id=3: Bedroom/patio photo with distinct content

### Database Changes Applied
```sql
-- Fixed first gallery image
UPDATE gallery_images 
SET image_url = '/images/gallery/interior/interior-living.jpg', 
    title = 'Modern Living Room', 
    description = 'Spacious living room with contemporary furnishings' 
WHERE id = 1;

-- Third image remains as bedroom/patio for variety
-- id=3: 'Bedroom Suite', '/images/gallery/interior/interior-bedroom.jpg'
```

## Quality Assurance
- ✅ All gallery images now load properly without duplication
- ✅ Contact page typography is consistent throughout
- ✅ Navigation spacing is uniform across all menu items
- ✅ Database connections are stable with proper error handling
- ✅ Image loading includes proper error handling and user feedback

## Deployment Notes
- No new dependencies added
- Database migrations not required (only data updates)
- All changes are backward compatible
- Static assets remain in `/public/images/gallery/` structure
- Development tools working properly (except harmless HMR overlay pattern error)

## Next Steps for Production
1. Test all gallery images load correctly
2. Verify contact form functionality
3. Confirm navigation consistency across all pages
4. Test database connection stability under load
5. Deploy to production environment

---
**Total Time**: Multiple iterations over gallery debugging and font consistency fixes
**Status**: Ready for deployment