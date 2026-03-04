

# Connect Website to Google Sheets Database

## Current State
The website uses a hardcoded array of ~11 properties in `src/data/properties.ts`. All pages (Properties, PropertyDetail, Index, AIFinder) import from this static array.

## Google Sheet Structure
The sheet has these columns:
`id | title | price | city | address | rooms | size | description | image_main | image_1 | image_2 | image_3 | image_4 | image_5 | feature_1 | feature_2 | feature_3 | feature_4 | feature_5 | status`

Currently has 1 sample row. The sheet is publicly accessible via CSV export URL.

## Plan

### 1. Create Google Sheets fetcher service
- New file `src/services/googleSheets.ts`
- Fetch CSV from `https://docs.google.com/spreadsheets/d/1353uIis39F6gb8RBgWX3_so1UalasRTSWVzCfiYITyU/export?format=csv`
- Parse CSV rows into `Property` objects, mapping columns:
  - `title` → `name`, `city` → `location`, `image_main` → `image`
  - Collect `image_1`-`image_5` (non-empty) into `images[]`
  - Collect `feature_1`-`feature_5` (non-empty) into `features[]`
  - `status` column maps to `isNew`/`isHot` flags

### 2. Create React Query hook
- New file `src/hooks/useProperties.ts`
- `useProperties()` hook using `@tanstack/react-query` to fetch and cache sheet data
- Stale time of ~5 minutes so data refreshes periodically

### 3. Update Property interface
- Update `src/data/properties.ts` to keep the `Property` interface, `formatPrice`, and `generateWhatsAppLink` functions
- Remove the hardcoded `properties` array
- Add `type` as optional field (sheet doesn't have it, default to "דירה")
- Add `longDescription` as alias for `description`

### 4. Update all consuming pages
- **Properties.tsx**: Use `useProperties()` hook instead of static import. Update filters for city (dynamic from data), price range slider, rooms, and size
- **PropertyDetail.tsx**: Use `useProperties()` to find property by ID
- **Index.tsx**: Use `useProperties()` for featured properties
- **AIFinder.tsx**: Use `useProperties()` for scoring
- **PropertyCard.tsx**: No changes needed (already uses Property interface)

### 5. Enhanced filter system on Properties page
- Price range filter (min/max with slider or preset ranges)
- City filter (dynamically extracted from loaded data)
- Rooms filter
- Property size filter
- All filters work together

### 6. WhatsApp message format
Update `generateWhatsAppLink` to use the exact message format requested:
```
Hello Michal,
I'm interested in this property:
Property: {title}
City: {city}
Price: {price}
Rooms: {rooms}
Please send me more details.
```

### Important Note
The Google Sheet must be **published to the web** (File → Share → Publish to web) for the CSV export to work without authentication. If it's only shared via link, the export URL may require login. I'll add error handling and a fallback message if the sheet can't be loaded.

