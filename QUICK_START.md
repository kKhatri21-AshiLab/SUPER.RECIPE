# 🚀 SUPER.RECIPE - Quick Reference Card

## ⚡ Start in 3 Steps

### Step 1: Open Terminal 1 - Start MongoDB
```bash
mongod
```
Leave this running in background.

### Step 2: Open Terminal 2 - Start Backend API
```bash
cd BACKEND
npm install
npm run dev
```

Wait for:
```
✓ Connected to MongoDB
✓ Loaded recipes from JSON files
✓ SUPER.RECIPE API SERVER STARTED
```

### Step 3: Open Terminal 3 - Serve Frontend
```bash
python -m http.server 8000
```

Or use VS Code Live Server:
- Right-click INDEX.HTML → "Open with Live Server"

---

## 🌐 Access Application

Visit: **`http://localhost:8000/INDEX.HTML`**

You should see recipe cards! 🎉

---

## 📱 Navigation Links

From ANY page, use top navigation bar:

| Button | Link | File |
|--------|------|------|
| 🏠 Home | indexMain.html | indexMain.html |
| 👤 Login | LOGIN PAGE.HTML | LOGIN PAGE.HTML |
| ➕ Add Recipe | ADD RECIPE PAGE.HTML | ADD RECIPE PAGE.HTML |
| 📚 Recipes | INDEX.HTML | INDEX.HTML (MAIN) |
| 🔍 Search | SEARCHING RECIPE FROM MEAL DP.html | SEARCHING RECIPE FROM MEAL DP.html |

---

## 🔗 API Endpoints

**Base URL**: `http://localhost:5000`

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/recipes` | GET | Get all recipes (limit=50) |
| `/api/recipes/category/baking` | GET | Get category recipes |
| `/api/recipes/search?query=chicken` | GET | Search recipes |
| `/api/recipes/:id` | GET | Get single recipe |
| `/api/recipes` | POST | Add new recipe |
| `/api/health` | GET | Server status |

---

## 📊 Recipes Available

| Source | Count | Location |
|--------|-------|----------|
| recipes.json | 50+ | dATAbASE/JSON DATA/ |
| baking.json | 20+ | dATAbASE/JSON DATA/ |
| budget.json | ~15 | dATAbASE/JSON DATA/ |
| health.json | ~10 | dATAbASE/JSON DATA/ |
| inspiration.json | ~5 | dATAbASE/JSON DATA/ |
| MongoDB | User added | recipes collection |
| **TOTAL** | **150+** | Combined |

---

## 🧪 Test Everything Works

### Test 1: Is backend running?
```bash
curl http://localhost:5000
```
Expected: JSON with endpoints listed

### Test 2: Is MongoDB connected?
```bash
curl http://localhost:5000/api/health
```
Expected: `"mongodb": "Connected"`

### Test 3: Get recipes
```bash
curl "http://localhost:5000/api/recipes?limit=5"
```
Expected: JSON array with 5 recipes

### Test 4: Frontend loaded?
```
Visit: http://localhost:8000/INDEX.HTML
```
Expected: See recipe cards on screen

---

## ❌ Quick Fixes

| Problem | Solution |
|---------|----------|
| Port 5000 in use | Change BACKEND/.env PORT=5001 |
| CORS error | Ensure frontend is http://localhost:8000 |
| No recipes showing | Check MongoDB is running (mongod) |
| JSON not loading | Verify dATAbASE/JSON DATA/ folder exists |
| API 404 error | Check backend server is running |

---

## 📝 File Checklist

✅ `BACKEND/server.js` - API server created
✅ `BACKEND/package.json` - Dependencies configured
✅ `BACKEND/.env` - MongoDB connection
✅ `INDEX.HTML` - Updated to use API
✅ `dATAbASE/JSON DATA/*.json` - 5 JSON files with 150+ recipes
✅ `INTEGRATION_GUIDE.md` - Full documentation
✅ Navigation - All pages linked
✅ CORS - Enabled for frontend access

---

## 🎯 What's Connected

```
Frontend (HTML)           Backend (Node.js)        Data (MongoDB + JSON)
    ↓                            ↓                         ↓
INDEX.HTML        →    API at :5000        →    MongoDB + 5 JSON files
indexMain.html    →    server.js            →    150+ recipes
LOGIN PAGE.HTML   →    /api/recipes         →    baking, budget, health
etc                 /api/search              inspiration, recipes.json
                     /api/health
```

---

## 🔐 Demo Credentials

**Login Page:**
- Email: `demo@test.com`
- Password: `123456`

---

## 🆘 Still Having Issues?

1. Check all 3 terminals are running (MongoDB, Backend, Frontend)
2. Check ports:
   - MongoDB: 27017
   - Backend: 5000
   - Frontend: 8000
3. Check browser console (F12) for JavaScript errors
4. Check backend console for API errors
5. Try fresh page load (Ctrl+F5)

---

## 📞 Useful Commands

**Kill a process (if port stuck):**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

**Check if MongoDB is installed:**
```bash
mongod --version
```

**Check if Node.js is installed:**
```bash
node --version
npm --version
```

---

## 🎉 You're Ready!

Run 3 commands in 3 terminals and enjoy! 🚀

```bash
# Terminal 1
mongod

# Terminal 2
cd BACKEND && npm install && npm run dev

# Terminal 3
python -m http.server 8000
```

Then visit: **`http://localhost:8000/INDEX.HTML`**
