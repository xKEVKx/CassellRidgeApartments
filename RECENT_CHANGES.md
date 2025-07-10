# Recent Changes - July 10, 2025

## Promotional Banner System Implementation

### Overview
Implemented a complete promotional banner system that allows administrators to toggle promotional banners on individual floor plans and display them on the website.

### Database Changes
- Added `promotion_available` boolean field to `floor_plans` table (default: false)
- Added `promo_last_updated` timestamp field to track when promotions were last modified
- Applied schema changes with `npm run db:push`

### Backend API Enhancements
- **Enhanced PATCH `/api/floor-plans/:id`**: Now accepts both `startingPrice` and `promotionAvailable` fields
- **Conditional Validation**: Only validates `startingPrice` when provided, allows promotion-only updates
- **Separate Timestamp Tracking**: 
  - Updates `lastUpdated` when `startingPrice` changes
  - Updates `promoLastUpdated` when `promotionAvailable` changes

### Admin Panel Features
- **Promotional Checkboxes**: Added "Promotion Available" toggle for each floor plan
- **Smart Save Button**: "Save Changes" button activates for either rent or promotion changes
- **Combined Change Counter**: Shows total count of pending rent and promotion changes
- **Dual Timestamp Display**:
  - "Rent Last Updated:" shows when prices were last modified
  - "Promo Last Updated:" shows when promotions were last toggled
- **Proper State Management**: Both `rentUpdates` and `promotionUpdates` states clear after successful saves

### Frontend Display
- **Home Page Banners**: Promotional banners appear next to floor plan names on home page cards
- **Conditional Display**: Banners only show for floor plans with `promotionAvailable: true`
- **Styled Banners**: Red background with tag icon and "Promotion" text
- **Dynamic Updates**: Banners appear/disappear based on admin changes

### UI/UX Improvements
- **Content Consistency**: Updated all "fitness room" references to "fitness center" throughout site
- **Typography Fix**: Adjusted spacing to prevent text cutoff in "Bicycle Club Apartments" heading
- **Logo Enhancement**: Increased header logo size by 20% for better visibility

### Technical Implementation Details

#### Database Schema
```sql
-- Added to floor_plans table
promotion_available BOOLEAN DEFAULT false,
promo_last_updated TIMESTAMP DEFAULT NOW()
```

#### API Route Logic
```javascript
// Conditional field updates
if (startingPrice !== undefined) {
  updates.startingPrice = startingPrice;
  updates.lastUpdated = new Date();
}

if (promotionAvailable !== undefined) {
  updates.promotionAvailable = promotionAvailable;  
  updates.promoLastUpdated = new Date();
}
```

#### Admin Panel State Management
```javascript
// Button enables for any changes
disabled={Object.keys(rentUpdates).length === 0 && Object.keys(promotionUpdates).length === 0}

// Combined change counter
{Object.keys(rentUpdates).length + Object.keys(promotionUpdates).length}
```

#### Home Page Banner Component
```jsx
{plan.promotionAvailable && (
  <div className="bg-red-600 text-white px-2 py-1 rounded flex items-center gap-1 text-xs">
    <Tag className="w-3 h-3" />
    <span className="font-semibold">Promotion</span>
  </div>
)}
```

### Testing Verification
- ✅ Admin can toggle promotional banners on/off for individual floor plans
- ✅ "Save Changes" button activates for promotion checkbox changes
- ✅ Button shows correct combined count of all pending changes
- ✅ Promotional banners appear on correct floor plan cards on home page
- ✅ Separate timestamps track rent vs promotion changes accurately
- ✅ State management properly clears after successful saves
- ✅ API handles both rent and promotion updates independently

### Files Modified
- `shared/schema.ts` - Added promotional fields to database schema
- `server/storage.ts` - Enhanced update logic with conditional timestamps
- `server/routes.ts` - Updated PATCH route to handle multiple field types
- `client/src/pages/admin.tsx` - Added promotional controls and dual timestamps
- `client/src/pages/home.tsx` - Added promotional banner display
- `client/src/lib/constants.ts` - Updated "fitness room" to "fitness center"
- `replit.md` - Updated project documentation

### Deployment Notes
- Database schema changes applied automatically via Drizzle migrations
- No breaking changes to existing functionality
- All existing rent management features preserved
- New promotional features optional and backwards compatible

## Summary
The promotional banner system is now fully operational, providing administrators with granular control over promotional messaging while maintaining clean separation between rent and promotion management. The system includes comprehensive timestamp tracking and intuitive UI feedback for all administrative actions.