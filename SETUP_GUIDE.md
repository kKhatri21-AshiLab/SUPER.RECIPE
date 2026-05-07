# SUPER.RECIPE - Complete Setup & Connection Guide

## Project Structure

```
SUPER.RECIPE/
├── BACKEND/                    # Node.js Express API Server
│   ├── server.js              # Main API server (connects MongoDB + JSON)
│   ├── package.json           # Dependencies
│   ├── .env                   # Configuration (MongoDB URI)
│   └── README.md              # Backend documentation
│
├── dATAbASE/                  # Recipe data sources
│   ├── JSON DATA/             # JSON recipe files
│   │   ├── recipes.json       # Main recipes
│   │   ├── baking.json        # Baking recipes
│   │   ├── budget.json        # Budget-friendly recipes
│   │   ├── health.json        # Healthy recipes
│   │   └── inspiration.json   # Inspiring recipes
│   ├── playground-2.mongodb.js    # MongoDB connection
│   └── CSV/                   # CSV data (legacy)
│
├── HTML Files (Frontend)
│   ├── INDEX.HTML             # Recipe showcase (main page)
│   ├── indexMain.html         # Home page with search
│   ├── LOGIN PAGE.HTML        # Login/authentication
│   ├── ADD RECIPE PAGE.HTML   # Add new recipe form
│   └── SEARCHING RECIPE FROM MEAL DP.html  # Search page
│
├── img/                       # Images and assets
├── styles/                    # CSS styles
│   └── shared-nav.css         # Navigation styles (shared)
│
└── README.md
```

## Setup Instructions

### Step 1: Install Backend Dependencies
```bash
cd BACKEND
npm install
```

### Step 2: Configure MongoDB Connection
Edit `BACKEND/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/recipes
PORT=5000
NODE_ENV=development
```

**How to find your MongoDB URI:**
- Local MongoDB: `mongodb://localhost:27017/recipes`
- MongoDB Atlas (cloud): `mongodb+srv://username:password@cluster.mongodb.net/recipes?retryWrites=true&w=majority`

### Step 3: Start the Backend Server
```bash
cd BACKEND
npm run dev
```

Expected output:
```
✓ Connected to MongoDB
✓ Loaded 150+ recipes from JSON files
✓ SUPER.RECIPE API SERVER STARTED
🌐 Server: http://localhost:5000
📝 API Docs: http://localhost:5000/api/recipes
```

### Step 4: Serve Frontend Files
You need to serve the HTML files through a web server (not local file://).

**Option A: Using Python** (if installed)
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Option B: Using Node.js**
```bash
npx http-server
```

**Option C: Using Live Server (VS Code)**
- Install "Live Server" extension
- Right-click on INDEX.HTML → Open with Live Server

### Step 5: Access the Application
- Frontend: `http://localhost:8000` (or your server port)
- Backend API: `http://localhost:5000`
- Recipes endpoint: `http://localhost:5000/api/recipes`

## File Connections

### Navigation Links (All Pages Connected)
All HTML files have a top navigation bar that links to:
- Home (indexMain.html)
- Login (LOGIN PAGE.HTML)
- Add Recipe (ADD RECIPE PAGE.HTML)
- Recipes (INDEX.HTML) ← **Main page - displays all recipes**
- Search (SEARCHING RECIPE FROM MEAL DP.html)

### Data Flow

```
Frontend (HTML Pages)
         ↓
    fetch API
         ↓
Backend Server (server.js)
    /api/recipes
         ↓
    ┌─────────┐
    │         │
MongoDB    JSON Files
(recipes)  (5 JSON files)
```

## API Endpoints

All endpoints return JSON data and are accessible at `http://localhost:5000`

### Get All Recipes
```
GET /api/recipes?limit=50&skip=0
```

### Search by Category
```
GET /api/recipes/category/baking
GET /api/recipes/category/health
```

### Search Recipes
```
GET /api/recipes/search?query=chicken
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
  "name": "Recipe Name",
  "description": "...",
  "ingredients": [...],
  "steps": [...],
  "image": "url"
}
```

### Health Check
```
GET /api/health
```

## Data Sources

### 1. JSON Recipe Files (Included)
- **recipes.json**: 50+ general recipes
- **baking.json**: 20+ baking recipes
- **budget.json**: Budget-friendly recipes
- **health.json**: Healthy recipes
- **inspiration.json**: Inspiring recipes

### 2. MongoDB Database
You can add recipes directly to MongoDB:
```javascript
// Using MongoDB CLI
use recipes
db.recipes.insertOne({
  name: "My Recipe",
  description: "...",
  ingredients: [...],
  steps: [...]
})
```

## Troubleshooting

### Backend Won't Start
```
Error: connect ECONNREFUSED 127.0.0.1:27017

✓ Solution: Start MongoDB first
mongod
```

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy

✓ Solution: Backend CORS is enabled automatically
Check API_URL in INDEX.HTML is correct: http://localhost:5000
```

### 404 on /api/recipes
```
✓ Check backend server is running on port 5000
✓ Verify MongoDB/JSON files are loaded (check console)
✓ Check API_URL in INDEX.HTML
```

### JSON Files Not Loading
```
✓ Verify files exist in: dATAbASE/JSON DATA/
✓ Check file names exactly match (case-sensitive)
✓ Validate JSON format: jsonlint.com
```

### Recipes Not Showing
1. Check backend server: `http://localhost:5000/api/health`
2. Check browser console for errors (F12)
3. Verify MongoDB connection in BACKEND/.env
4. Try refreshing page (Ctrl+F5)

## Testing the Connection

### Test 1: Check if Backend is Running
```
Visit: http://localhost:5000
Expected: JSON response with API endpoints
```

### Test 2: Check API Health
```
Visit: http://localhost:5000/api/health
Expected: { "status": "Server is running", "mongodb": "Connected" }
```

### Test 3: Check Recipes Endpoint
```
Visit: http://localhost:5000/api/recipes?limit=5
Expected: JSON array with 5 recipes
```

### Test 4: Check Frontend
```
Visit: http://localhost:8000/INDEX.HTML
Expected: Recipe cards appear (if MongoDB/JSON connected)
```

## Features Explained

### Recipe Display (INDEX.HTML)
- Shows 50 recipes from MongoDB + JSON
- Click recipe card to view full details
- Modal popup shows ingredients & instructions
- Responsive grid layout
- Smooth animations

### Search (SEARCHING RECIPE FROM MEAL DP.html)
- Search recipes by name/ingredients
- Filter by category (baking, health, budget, etc.)
- Real-time results

### Add Recipe (ADD RECIPE PAGE.HTML)
- Form to add new recipes
- Validates input
- Stores in browser (localStorage)
- Can be extended to save to MongoDB

### Login (LOGIN PAGE.HTML)
- User authentication UI
- Demo credentials: email@test.com / 123456
- Stores user session

### Home (indexMain.html)
- Landing page with ingredient search
- Quick access to all pages

## Performance Tips

1. **Limit results**: Use `?limit=20` instead of loading all
2. **Pagination**: Use `?skip=20&limit=20` for next page
3. **Caching**: Results are cached in browser (localStorage)
4. **Lazy loading**: Images load only when needed

## Future Enhancements

- [ ] Add user authentication to MongoDB
- [ ] Save favorite recipes per user
- [ ] Rate and review recipes
- [ ] Add recipe filtering by difficulty/time
- [ ] Implement recipe recommendations
- [ ] Add shopping list generator
- [ ] Deploy to cloud (Heroku, AWS, etc.)

## Database Schema

### MongoDB Recipe Collection
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  image: String (URL),
  ingredients: Array,
  steps: Array,
  author: String,
  rattings: Number (1-5),
  serves: Number,
  difficult: String,
  createdAt: Date
}
```

### JSON Recipe Format
```json
{
  "id": "unique-id",
  "name": "Recipe Name",
  "description": "Short description",
  "image": "image-url",
  "ingredients": ["ingredient1", "ingredient2"],
  "steps": ["step1", "step2"],
  "author": "Author Name",
  "rattings": 4,
  "serves": 2,
  "difficult": "Easy",
  "maincategory": "recipes"
}
```

## Support

For issues or questions:
1. Check browser console (F12 → Console tab)
2. Check backend console for errors
3. Verify .env configuration
4. Test API endpoints directly in browser
5. Check MongoDB is running

## License
MIT
