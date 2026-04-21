# 🚀 SUPER.RECIPE - Fullstack Recipe App (Beginner-Friendly!)

## 🌟 What is SUPER.RECIPE?
Modern recipe sharing app with:
- **Frontend**: HTML/CSS/JS (no frameworks needed)
- **Backend**: Node.js + Express + MongoDB
- **Features**: Add recipes, search/filter, A-Z recipes, video tutorials
- **Perfect for learning**: Fullstack development from scratch

## 📋 Quick Start (5 minutes)

### 1. Backend Setup
```bash
cd BACKEND/backend
npm install          # Install express, mongoose, etc
npm run dev          # Start server → http://localhost:5000
```

**Create `.env` file** (BACKEND/backend/.env):
```
MONGODB_URI=mongodb://localhost:27017/super-recipe
PORT=5000
```

### 2. Frontend
```bash
# Just open in browser!
# - indexMain.html (home/search)
# - ADD RECIPE PAGE.HTML (create recipe)
# - INDEX.HTML (recipe showcase)
```

### 3. Test API (Postman)
```
GET  http://localhost:5000/api/health          # Server status
GET  http://localhost:5000/api/recipes         # List recipes  
POST http://localhost:5000/api/recipes         # Create recipe
```

## 🛠️ File Structure
```
SUPER.RECIPE/
├── BACKEND/backend/           # Node.js API
│   ├── package.json          # Dependencies (express, mongoose)
│   ├── backend-server.js     # Express server setup
│   ├── models/Recipe.js      # MongoDB schema (well-commented!)
│   └── routes/recipes.js     # CRUD API routes (well-commented!)
├── ADD RECIPE PAGE.HTML      # Form + validation (MongoDB ready)
├── indexMain.html            # Home + A-Z search
├── styles/                   # CSS
└── TODO_COMMENTS.md          # Progress tracker
```

## 🔧 API Documentation

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/recipes` | List recipes (?search=chicken) |
| `GET` | `/api/recipes/:id` | Single recipe |
| `POST` | `/api/recipes` | **Create** new recipe |
| `PUT` | `/api/recipes/:id` | Update recipe |
| `DELETE` | `/api/recipes/:id` | Delete recipe |

**POST Body Example**:
```json
{
  \"title\": \"Chicken Curry\",
  \"description\": \"Spicy Indian curry\",
  \"ingredients\": [\"chicken\", \"curry powder\"],
  \"instructions\": [\"fry chicken\", \"add spices\"]
}
```

## 🧪 Testing
1. **Health Check**: `curl http://localhost:5000/api/health`
2. **Postman Collection**: postman/ folder
3. **Frontend Integration**: Replace MongoClient with `fetch('/api/recipes')`

## 🚀 Next Steps (from TODO_COMMENTS.md)
1. `npm install && npm run dev`
2. Test CRUD endpoints
3. Connect frontend forms to API

## 💡 Learning Points
- **Express Router**: Clean API organization
- **Mongoose Schema**: Database structure + validation
- **Async/Await**: Modern error-free async code
- **Slug Generation**: SEO-friendly URLs
- **Full-Text Search**: MongoDB indexing
- **Error Handling**: Production-ready responses

**Questions?** Check well-commented code → every line explained!

⭐ **Star if helpful!**
