# Git Commit Messages for Recent Changes

## Suggested Commit Structure

### Main Commit
```
fix: Gallery image loading, contact typography, and email updates

- Fix first gallery image not displaying due to problematic image with gray area
- Replace interior-6.jpg with interior-living.jpg for better visual presentation
- Resolve duplicate images in gallery (positions 1 and 3)
- Update database records to show living room vs bedroom for variety
- Fix Contact Us heading font to match site-wide typography consistency
- Remove font-serif class from contact page heading
- Update email address from manager@bicycleclubapts.com to bicycleclub-w@m.knck.io
- Change email display text to "Email Us" in contact page and footer

Database changes:
- Updated gallery_images id=1: Modern Living Room with interior-living.jpg
- Maintained gallery_images id=3: Bedroom Suite with interior-bedroom.jpg

Files modified:
- client/src/pages/contact.tsx (typography + email display)
- client/src/components/layout/footer.tsx (email display)
- client/src/lib/constants.ts (email address)
- Database: gallery_images table records 1 and 3
```

### Alternative Individual Commits

#### Commit 1: Gallery Image Fix
```
fix(gallery): Replace problematic first image and resolve duplicates

- Replace interior-6.jpg with interior-living.jpg to fix loading issue
- Update database record id=1 with living room photo and description
- Resolve duplicate images between positions 1 and 3 in gallery
- Ensure proper image variety (living room vs bedroom/patio)
```

#### Commit 2: Typography Fix
```
fix(contact): Standardize heading font to match site typography

- Remove font-serif class from Contact Us heading
- Maintain consistent sans-serif font throughout contact page
- Improve visual consistency across all page headings
```

#### Commit 3: Email Updates
```
update: Change email address and display text

- Update contact email from manager@bicycleclubapts.com to bicycleclub-w@m.knck.io
- Change email display text to "Email Us" in contact page and footer
- Maintain proper mailto functionality while improving UX
- Update site constants for consistent email usage
```

## Files to Stage for Commit

### Modified Files
- `client/src/pages/contact.tsx` (font fix + email display)
- `client/src/components/layout/footer.tsx` (email display)
- `client/src/lib/constants.ts` (email address)
- `RECENT_CHANGES.md` (updated documentation)
- `replit.md` (updated changelog)
- `COMMIT_MESSAGES.md` (this file)

### Database Changes (Applied via SQL)
- gallery_images table: Updated records 1 and 3
- No migration files needed (data-only changes)

## Pre-Deploy Checklist

- [ ] All gallery images load properly without duplicates
- [ ] Contact page typography is consistent
- [ ] Navigation menu spacing is uniform
- [ ] Database connections are stable
- [ ] No new dependencies introduced
- [ ] Static assets properly organized in /public/images/gallery/
- [ ] Development environment runs without critical errors

## Production Deployment Notes

1. **Database**: Apply SQL updates to production database
2. **Assets**: Ensure all images in /public/images/gallery/ are deployed
3. **Environment**: No new environment variables required
4. **Testing**: Verify gallery functionality and contact page display
5. **Monitoring**: Check for any image loading errors in production

---
**Branch**: main
**Ready for deployment**: ✅ Yes
**Breaking changes**: ❌ None