# Suggested Commit Messages for GitHub Push

## Main Commit
```
feat: Complete promotional banner system with admin controls and dual timestamp tracking

- Add promotional banner toggles in admin panel for individual floor plans
- Implement separate timestamp tracking for rent vs promotion changes  
- Display promotional banners on home page floor plan cards
- Enhance PATCH API to handle both rent and promotion updates independently
- Update admin "Save Changes" button to activate for any pending changes
- Add dual timestamp display: "Rent Last Updated" and "Promo Last Updated"
- Fix content consistency: update "fitness room" to "fitness center" 
- Improve UI: increase logo size 20% and fix typography spacing
```

## Alternative Detailed Commits (if you prefer smaller commits)

### Database & Backend
```
feat(db): Add promotional banner fields and conditional timestamp tracking

- Add promotion_available boolean and promo_last_updated timestamp to floor_plans
- Update storage layer to conditionally update timestamps based on changed fields
- Enhance PATCH /api/floor-plans/:id to handle rent and promotion updates separately
```

### Admin Panel
```
feat(admin): Complete promotional banner controls with dual timestamps

- Add "Promotion Available" checkboxes for each floor plan
- Fix "Save Changes" button to activate for promotion changes
- Display combined count of rent and promotion pending changes  
- Show separate "Rent Last Updated" and "Promo Last Updated" timestamps
- Improve state management with proper clearing after successful saves
```

### Frontend Display
```
feat(ui): Add promotional banners to home page floor plan cards

- Display promotional banners next to floor plan names when enabled
- Style banners with red background, tag icon, and compact design
- Conditionally show banners based on admin promotional settings
- Update content consistency: "fitness room" to "fitness center"
```

### UI Improvements
```
style: Enhance header logo and fix typography spacing

- Increase header logo size by 20% for better visibility
- Fix spacing in "Bicycle Club Apartments" heading to prevent text cutoff
- Improve overall visual hierarchy and readability
```

## Files Changed Summary
```
Modified files:
- shared/schema.ts (database schema updates)
- server/storage.ts (conditional timestamp logic)  
- server/routes.ts (enhanced PATCH route)
- client/src/pages/admin.tsx (promotional controls & timestamps)
- client/src/pages/home.tsx (promotional banner display)
- client/src/lib/constants.ts (content consistency updates)
- replit.md (project documentation updates)

New files:
- RECENT_CHANGES.md (detailed change documentation)
- COMMIT_MESSAGES.md (this file)
```

## Recommended Approach
Use the main commit message for a single comprehensive commit, or break it into the 4 detailed commits if you prefer more granular version control. All changes are backwards compatible and non-breaking.