# ⚙️ SUPER.RECIPE - Complete Setup & Connection Guide

## 🎯 What You Have Now

✅ **Backend API Server** (`BACKEND/server.js`) - Ready to run
✅ **INDEX.HTML** - Updated to use API
✅ **5 JSON Recipe Files** - 150+ recipes in `dATAbASE/JSON DATA/`
✅ **Navigation Links** - All pages connected
✅ **MongoDB Integration** - Database support
✅ **Documentation** - Complete guides included

---

## 🚀 How to Start (Step-by-Step)

### Prerequisites Check

Before starting, you need:
1. **Node.js & npm** - Download from https://nodejs.org/
2. **MongoDB** - Download from https://www.mongodb.com/try/download/community
3. **Python og frontend files

**Check if installed:**
```bash
node --version      # Should show v14+ or v16+
npm --version       # Should show version
mongod --version    # Should show version
```

If not installed, download and install them first.

---

## Step 1️⃣: Start MongoDB

MongoDB needs to be running in the background.

### Windows
```bash
# If MongoDB installed via installer
"C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe"

# Or if in PATH:
mongod
```

### Mac/Linux
```bash
mongod
```

**Expected output:**
```
[initandlisten] MongoDB starting : pid=12345
[initandlisten] Listening on port 27017
```

Leave this running! Open new terminal for next step.

---

## Step 2️⃣: Start Backend API Server

Open **new terminal** and run:

```bash
cd SUPER.RECIPE/BACKEND
npm install
npm run dev
```

**What happens:**
1. `npm install` - Downloads dependencies (Express, MongoDB driver, CORS)
2. `npm run dev` - Starts the server

**Expected output:**
```
✓ Connected to MongoDB
✓ Loaded 150 recipes from JSON files
✓ SUPER.RECIPE API SERVER STARTED
========================================
🌐 Server: http://localhost:5000
📝 API Docs: http://localhost:5000/api/recipes
❤️ Health Check: http://localhost:5000/api/health
========================================
```

**Keep this running!** Open new terminal for next step.

---

## Step 3️⃣: Serve Frontend Files

You need to serve the HTML files through a web server (not file://).

### Option A: Using Python (Most Common)

```bash
# Navigate to project folder
cd SUPER.RECIPE

# Python 3
python -m http.server 8000

# Python 2 (older)
python -m SimpleHTTPServer 8000
```

**Expected output:**
```
Serving HTTP on 0.0.0.0 port 8000
```

### Option B: Using Node.js (Alternative)

```bash
cd SUPER.RECIPE
npx http-server
```

### Option C: Using VS Code Live Server (Easiest)

1. Install "Live Server" extension in VS Code
2. Right-click on `INDEX.HTML` → "Open with Live Server"
3. Browser opens automatically

---

## Step 4️⃣: Access the Application

Open your browser and visit:

**`http://localhost:8000/INDEX.HTML`**

You should see:
- ✅ Navigation bar with links to all pages
- ✅ Purple gradient hero section
- ✅ Recipe cards loading from database
- ✅ Click recipe to see full details in modal

---

## 🧪 Test Everything Works

### Test 1: Is Backend Running?
```
Visit: http://localhost:5000

Expected: JSON response with API endpoints
```

### Test 2: Is Database Connected?
```
Visit: http://localhost:5000/api/health

Expected: 
{
  "status": "Server is running",
  "mongodb": "Connected",
  "jsonRecipesLoaded": 150
}
```

### Test 3: Get Recipes
```
Visit: http://localhost:5000/api/recipes?limit=5

Expected: JSON array with 5 recipes
```

### Test 4: Frontend Display
```
Visit: http://localhost:8000/INDEX.HTML

Expected: See recipe cards on screen
```

---

## 🗺️ File Navigation Guide

**All pages have navigation bar at top:**

| Page | What It Does | Navigation |
|------|-------------|-----------|
| **INDEX.HTML** | Display all recipes from database | 📚 Recipes (current page) |
| **indexMain.html** | Home page with ingredient search | 🏠 Home |
| **LOGIN PAGE.HTML** | User login screen (demo available) | 👤 Login |
| **ADD RECIPE PAGE.HTML** | Form to add new recipes | ➕ Add Recipe |
| **SEARCHING RECIPE FROM MEAL DP.html** | Search and filter recipes | 🔍 Search |

You can click any navigation button to go to that page.

---

## 📊 Data Integration

### Where Recipes Come From

```
Backend Server (server.js)
    ↓
    ├─ Connects to MongoDB database
    │  └─ Stores user-added recipes
    │
    └─ Loads 5 JSON files
       ├─ recipes.json (50+ recipes)
       ├─ baking.json (20+ recipes)
       ├─ budget.json (~15 recipes)
       ├─ health.json (~10 recipes)
       └─ inspiration.json (~5 recipes)
    
    Total: 150+ recipes automatically loaded
```

All recipes are served by API at: `http://localhost:5000/api/recipes`

---

## 🔗 API Endpoints

Backend API provides these endpoints:

| Endpoint | Purpose |
|----------|---------|
| `GET /api/recipes` | Get all recipes (limit 50) |
| `GET /api/recipes?limit=20&skip=0` | Pagination |
| `GET /api/recipes/category/baking` | Recipes by category |
| `GET /api/recipes/search?query=chicken` | Search recipes |
| `GET /api/recipes/:id` | Get single recipe |
| `POST /api/recipes` | Add new recipe |
| `GET /api/health` | Server status |

---

## ❌ Troubleshooting

### Problem: "Cannot find module 'express'"
**Solution:** Run `npm install` in BACKEND folder
```bash
cd BACKEND
npm install
```

### Problem: "Port 5000 already in use"
**Solution:** Change port in `BACKEND/.env`
```env
PORT=5001
```
Then update API_URL in `INDEX.HTML`:
```javascript
const API_URL = 'http://localhost:5001';
```

### Problem: "MongoDB connection refused"
**Solution:** Start MongoDB first
```bash
mongod
```
Wait for "Listening on port 27017" message.

### Problem: "Could not load recipes from database" (on frontend)
**Solution:** Make sure all 3 are running:
1. ✓ MongoDB (`mongod`)
2. ✓ Backend (`npm run dev` in BACKEND)
3. ✓ Frontend server (python http.server 8000)

And visit: `http://localhost:8000/INDEX.HTML` (not file://)

### Problem: "CORS error" in browser console
**Solution:** Ensure frontend is served via HTTP, not file://
- Use `http://localhost:8000` NOT `file://C:/Users/...`
- Use "Open with Live Server" or python http.server

### Problem: JSON files not loading
**Solution:** Check folder structure
```
dATAbASE/
  JSON DATA/
    ├─ recipes.json
    ├─ baking.json
    ├─ budget.json
    ├─ health.json
    └─ inspiration.json
```
Files must be in exact location with correct names.

---

## 🎯 Quick Checklist

### Before Starting
- ✓ Node.js installed (`node --version`)
- ✓ npm installed (`npm --version`)
- ✓ MongoDB installed (`mongod --version`)
- ✓ Python installed (for http.server)

### Terminal 1: MongoDB
```bash
mongod
# Wait for "Listening on port 27017"
```

### Terminal 2: Backend
```bash
cd SUPER.RECIPE/BACKEND
npm install
npm run dev
# Wait for "✓ SUPER.RECIPE API SERVER STARTED"
```

### Terminal 3: Frontend
```bash
cd SUPER.RECIPE
python -m http.server 8000
# Or use Live Server in VS Code
```

### Terminal 4: Browser
```
http://localhost:8000/INDEX.HTML
```

---

## 🌐 Connection Map

```
Browser (Frontend)
    http://localhost:8000
         ↓
    INDEX.HTML
         ↓
    fetch('http://localhost:5000/api/recipes')
         ↓
Backend API Server
    http://localhost:5000
         ↓
    Loads from MongoDB + JSON files
         ↓
    Returns recipes as JSON
         ↓
Frontend displays recipe cards
```

---

## 📝 Recipe Data Format

Each recipe has:
- **name** - Recipe title
- **description** - Short description
- **image** - Photo URL
- **ingredients** - Array of ingredients
- **steps** - Cooking instructions
- **author** - Recipe creator
- **rattings** - Rating (1-5 stars)
- **serves** - Number of servings
- **difficult** - Difficulty level (Easy, Medium, Hard)

---

## ✨ Features Available

✅ **View Recipes** - See all 150+ recipes on INDEX.HTML
✅ **Search** - Find recipes by name or ingredients
✅ **Filter by Category** - Baking, health, budget, inspiration
✅ **Recipe Details** - Click card to see full recipe
✅ **Add Recipe** - Form to add new recipes
✅ **Navigation** - Link between all pages
✅ **Responsive Design** - Works on desktop and mobile

---

## 🚀 You're Ready!

Once you follow the 4 steps above:

1. MongoDB running ✅
2. Backend running on :5000 ✅
3. Frontend server on :8000 ✅
4. Visit `http://localhost:8000/INDEX.HTML` ✅

You'll see all recipes from MongoDB + JSON files! 🎉

---

## 📞 Need Help?

Check:
1. All 3 services running (MongoDB, Backend, Frontend)
2. No errors in backend console
3. No errors in browser console (F12)
4. Using `http://` not `file://`
5. Port 5000 and 8000 are free
6. Firewall allows local connections

---

## 📚 Documentation Files

- **QUICK_START.md** - Fast setup guide
- **SETUP_GUIDE.md** - Detailed setup
- **INTEGRATION_GUIDE.md** - How everything connects
- **ARCHITECTURE.md** - System diagrams
- **BACKEND/README.md** - Backend documentation

Read these for more details on any topic!

---

**Happy cooking! 🍳** Start with the 4 steps above and enjoy your recipe application!
