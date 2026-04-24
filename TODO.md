# SUPER.RECIPE - FIX CSV RECIPE LOADING IN INDEX.HTML

## Information Gathered
- **INDEX.HTML** uses `fetch()` to load the local CSV file: `DATASET/Food Ingredients and Recipe Dataset with Image Name Mapping.csv`.
- **The CSV file exists** with correct columns (`Title`, `Ingredients`, `Instructions`, `Image_Name`) and ~58k rows of data.
- **Image folders exist** at `DATASET/Food Images/Food Images/`.
- **indexMain.html** works because it fetches from an external API (TheMealDB).
- **The backend** (`BACKEND/backend/backend-server.js`) only runs the MongoDB API and does **not** serve static frontend files or the dataset.

## Root Cause
When `INDEX.HTML` is opened directly (double-clicked / `file://` protocol), browsers block `fetch()` requests to local files due to **CORS/security policies**. The page silently fails into the catch block. Additionally, the CSV filename and image paths contain **spaces** that need URL encoding when fetched over HTTP.

## Implementation Status

### Step 1: `BACKEND/backend/backend-server.js` — Add Static File Serving ✅ **COMPLETE**
- Added `const path = require('path');`
- Added `app.use(express.static(path.join(__dirname, '../../')));` to serve the project root over HTTP.
- Added detailed beginner-friendly comments explaining WHY this is needed (CORS/file:// blocking).

### Step 2: `INDEX.HTML` — Fix Fetch & Image Paths ✅ **COMPLETE**
- **Encoded the CSV fetch URL** with `encodeURI()` so spaces are converted to `%20`.
- **Encoded image paths** with `encodeURI()` so `Food Images/Food Images/` works correctly.
- **Improved error handling** with a clear message explaining the server must be running.
- **Added 4 fallback sample recipes** so the page is never empty even if loading fails.
- Added step-by-step comments explaining each part of the fetch/parse/render process.

### Step 3: Testing
```bash
cd BACKEND/backend
npm install
npm run dev
# Then open http://localhost:5000/INDEX.HTML
```

## Dependent Files Edited
- ✅ `BACKEND/backend/backend-server.js`
- ✅ `INDEX.HTML`

---
**Status**: All edits implemented and ready for testing.


