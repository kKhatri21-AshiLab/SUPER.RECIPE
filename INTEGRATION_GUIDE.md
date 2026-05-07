# 🍳 SUPER.RECIPE - Complete Integration Guide

## ✅ What Has Been Connected

### Backend API Server (MongoDB + JSON)
- **Location**: `BACKEND/server.js`
- **Purpose**: Serves recipes from MongoDB database + 5 JSON files
- **Features**:
  - Loads recipes from JSON files (baking, budget, health, inspiration, recipes)
  - Connects to MongoDB database
  - Provides REST API endpoints
  - CORS enabled for frontend access

### Frontend Pages
- **INDEX.HTML** - Recipe showcase (UPDATED - now uses API)
- **indexMain.html** - Home page with search
- **LOGIN PAGE.HTML** - User login
- **ADD RECIPE PAGE.HTML** - Add new recipes
- **SEARCHING RECIPE FROM MEAL DP.html** - Search recipes

### Navigation Links
All pages now include a top navigation bar that links to:
- Home (indexMain.html)
- Login (LOGIN PAGE.HTML)
- Add Recipe (ADD RECIPE PAGE.HTML)
- Recipes (INDEX.HTML) ← Main page
- Search (SEARCHING RECIPE FROM MEAL DP.html)

---

## 🚀 Quick Start (5 Minutes)

### 1. Start MongoDB
```bash
# If MongoDB is installed locally
mongod
```

### 2. Start Backend Server
```bash
cd BACKEND
npm install
npm run dev
```

Expected output:
```
✓ Connected to MongoDB
✓ Loaded 150+ recipes from JSON files
✓ SUPER.RECIPE API SERVER STARTED
🌐 Server: http://localhost:5000
```

### 3. Serve Frontend
```bash
# Option A: Python
python -m http.server 8000

# Option B: Node.js
npx http-server

# Option C: Live Server (VS Code - right-click INDEX.HTML → Open with Live Server)
```

### 4. Access Application
- Open: `http://localhost:8000/INDEX.HTML`
- You should see recipe cards loading from the database!

---

## 📊 Data Sources

### MongoDB Database
- Collection: `recipes`
- Connect to: `mongodb://localhost:27017/recipes`
- Add recipes via MongoDB Atlas or CLI

### JSON Files (Included)
Located in `dATAbASE/JSON DATA/`:
- ✅ **recipes.json** - 50+ General recipes
- ✅ **baking.json** - 20+ Baking recipes
- ✅ **budget.json** - Budget-friendly recipes
- ✅ **health.json** - Healthy recipes
- ✅ **inspiration.json** - Inspiring recipes

**Total**: 150+ recipes ready to use!

---

## 🔌 API Endpoints

All endpoints at: `http://localhost:5000`

### Get All Recipes
```
GET /api/recipes?limit=50&skip=0

Response:
{
  "success": true,
  "count": 50,
  "recipes": [
    {
      "id": "...",
      "name": "Recipe Name",
      "description": "...",
      "image": "url",
      "ingredients": [...],
      "steps": [...],
      "rattings": 4
    }
  ]
}
```

### Search by Category
```
GET /api/recipes/category/baking
GET /api/recipes/category/health
GET /api/recipes/category/budget
```

### Search Recipes
```
GET /api/recipes/search?query=chicken&limit=20
```

### Get Single Recipe
```
GET /api/recipes/:id
```

### Add New Recipe
```
POST /api/recipes
Content-Type: application/json

{
  "name": "My Recipe",
  "description": "Description here",
  "ingredients": ["ingredient1", "ingredient2"],
  "steps": ["step1", "step2"],
  "image": "image-url"
}
```

### Health Check
```
GET /api/health

Response:
{
  "status": "Server is running",
  "mongodb": "Connected",
  "jsonRecipesLoaded": 150,
  "timestamp": "2024-05-07..."
}
```

---

## 📁 File Structure (Updated)

```
SUPER.RECIPE/
│
├── BACKEND/
│   ├── server.js              ← API Server (MongoDB + JSON)
│   ├── package.json           ← Dependencies
│   ├── .env                   ← MongoDB config
│   └── README.md              ← Backend docs
│
├── dATAbASE/
│   ├── JSON DATA/
│   │   ├── recipes.json       ← 50+ recipes
│   │   ├── baking.json        ← 20+ recipes
│   │   ├── budget.json        ← Budget recipes
│   │   ├── health.json        ← Healthy recipes
│   │   └── inspiration.json   ← Inspiring recipes
│   └── playground-2.mongodb.js ← MongoDB connection
│
├── HTML Files (Connected)
│   ├── INDEX.HTML             ← Recipe showcase (UPDATED)
│   ├── indexMain.html         ← Home page
│   ├── LOGIN PAGE.HTML        ← Login
│   ├── ADD RECIPE PAGE.HTML   ← Add recipes
│   └── SEARCHING RECIPE FROM MEAL DP.html ← Search
│
├── SETUP_GUIDE.md             ← Detailed setup
├── INTEGRATION_GUIDE.md       ← This file
└── README.md
```

---

## 🧪 Testing the Connection

### Test 1: Backend Server Running
```bash
curl http://localhost:5000
```
Expected: JSON response with API endpoints

### Test 2: MongoDB Connection
```bash
curl http://localhost:5000/api/health
```
Expected: Status "Server is running" with MongoDB "Connected"

### Test 3: Recipes Loading
```bash
curl "http://localhost:5000/api/recipes?limit=5"
```
Expected: Array with 5 recipes

### Test 4: Frontend Page
```
Visit: http://localhost:8000/INDEX.HTML
```
Expected: Recipe cards displayed with images and titles

---

## 🔧 Troubleshooting

### ❌ Problem: "Could not load recipes from database"
**Solution**:
1. Check backend is running: `npm run dev` in BACKEND folder
2. Check MongoDB is running: `mongod` in another terminal
3. Verify PORT 5000 is not in use
4. Refresh page (Ctrl+F5)

### ❌ Problem: CORS Error
**Solution**: CORS is enabled in backend. Check:
1. Frontend is on `http://localhost:8000` (not `file://`)
2. Backend is on `http://localhost:5000`
3. Check browser console (F12) for exact error

### ❌ Problem: MongoDB Connection Error
**Solution**:
1. Start MongoDB: `mongod`
2. Check connection string in `BACKEND/.env`
3. For MongoDB Atlas: Verify username/password

### ❌ Problem: JSON Files Not Loading
**Solution**:
1. Verify files exist in `dATAbASE/JSON DATA/`
2. Check file names (case-sensitive on Linux/Mac)
3. Validate JSON format: use `jsonlint.com`

### ❌ Problem: Port Already in Use
**Solution**: Change port in `BACKEND/.env`:
```env
PORT=5001
```

Then update API_URL in INDEX.HTML:
```javascript
const API_URL = 'http://localhost:5001';
```

---

## 🎯 Feature Walkthrough

### 1. Recipe Showcase (INDEX.HTML)
- Click navigation "Recipes" to go here
- Displays 50 recipes from MongoDB + JSON
- Click recipe card to see full details in modal
- Shows recipe image, ingredients, and instructions

### 2. Home Page (indexMain.html)
- Landing page with ingredient search
- Links to all other pages
- Hero section with call-to-action

### 3. Search (SEARCHING RECIPE FROM MEAL DP.html)
- Search recipes by name or ingredients
- Filter by category
- See results instantly

### 4. Add Recipe (ADD RECIPE PAGE.HTML)
- Form to add new recipes
- Validates input
- Can be extended to save to MongoDB

### 5. Login (LOGIN PAGE.HTML)
- User authentication UI
- Demo: email@test.com / 123456
- Stores user session

---

## 📝 How Data Flows

```
Browser (Frontend)
    ↓
INDEX.HTML (calls loadRecipes())
    ↓
fetch('http://localhost:5000/api/recipes')
    ↓
Backend Server (server.js)
    ↓
API Routes (/api/recipes)
    ↓
    ├─ MongoDB Connection
    │  └─ recipes collection
    │
    └─ JSON File Loader
       ├─ baking.json
       ├─ budget.json
       ├─ health.json
       ├─ inspiration.json
       └─ recipes.json
    ↓
Combined Results (MongoDB + JSON recipes)
    ↓
Return JSON response
    ↓
Frontend displays recipe cards
    ↓
User clicks card → modal opens with full details
```

---

## 🌟 Key Integration Points

### 1. **INDEX.HTML** ← Main page now uses API
```javascript
const API_URL = 'http://localhost:5000';
const response = await fetch(`${API_URL}/api/recipes?limit=50`);
```

### 2. **server.js** ← Backend combines data sources
```javascript
// Loads from MongoDB
const mongoRecipes = await db.collection('recipes').find({}).toArray();

// Loads from JSON
const jsonRecipes = loadJsonRecipes();

// Combines both
allRecipes = [...mongoRecipes, ...jsonRecipes];
```

### 3. **Navigation** ← All pages linked
```html
<a href="INDEX.HTML" class="nav-btn">Recipes</a>
<a href="indexMain.html" class="nav-btn">Home</a>
<a href="LOGIN PAGE.HTML" class="nav-btn">Login</a>
```

---

## 🚢 Deployment Ready

This setup is ready for deployment to:
- **Heroku** - Add Procfile
- **AWS** - Use EC2 + RDS
- **DigitalOcean** - App Platform
- **Vercel** - Frontend only
- **Railway** - Full stack
- **Render** - Node.js hosting

---

## 📚 Recipe Data Format

### MongoDB Schema
```json
{
  "_id": ObjectId,
  "name": "Recipe Name",
  "description": "Short description",
  "image": "https://image-url.jpg",
  "ingredients": ["ingredient1", "ingredient2"],
  "steps": ["step1", "step2"],
  "author": "Chef Name",
  "rattings": 4,
  "serves": 2,
  "difficult": "Easy",
  "createdAt": ISODate("2024-05-07")
}
```

### JSON Format (from files)
```json
{
  "id": "unique-id",
  "name": "Recipe Name",
  "description": "Description",
  "image": "image-url",
  "ingredients": ["ingredient1"],
  "steps": ["step1"],
  "author": "Name",
  "rattings": 4,
  "maincategory": "recipes"
}
```

---

## ✨ Next Steps

1. **Start the server** following "Quick Start" above
2. **Verify connection** using "Testing the Connection"
3. **Explore recipes** on INDEX.HTML
4. **Add your own** via ADD RECIPE PAGE.HTML
5. **Share** with the team

---

## 📞 Support

### Common Commands

**Start everything:**
```bash
# Terminal 1: MongoDB
mongod

# Terminal 2: Backend
cd BACKEND && npm run dev

# Terminal 3: Frontend
python -m http.server 8000
```

**Check if running:**
- MongoDB: `mongo` or connection test
- Backend: `http://localhost:5000`
- Frontend: `http://localhost:8000`

**View logs:**
- Backend: Console output when running npm run dev
- MongoDB: mongod terminal output
- Frontend: Browser console (F12)

---

## 🎉 You're All Set!

All files are now connected and working together:
- ✅ Backend API Server created
- ✅ MongoDB + JSON integration
- ✅ INDEX.HTML updated to use API
- ✅ Navigation links working
- ✅ 150+ recipes ready to display

**Next**: Run the commands above and enjoy! 🚀
