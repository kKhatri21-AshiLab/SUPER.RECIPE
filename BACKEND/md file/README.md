# SUPER.RECIPE Backend API Server

## Overview
This is a Node.js/Express backend server that serves recipes from MongoDB and JSON files. It provides REST API endpoints for fetching, searching, and adding recipes.

## Setup Instructions

### 1. Install Dependencies
```bash
cd BACKEND
npm install
```

### 2. Configure MongoDB Connection
Edit `.env` file and update MongoDB URI:
```env
MONGODB_URI=mongodb://localhost:27017/recipes
PORT=5000
```

### 3. Start the Server
```bash
npm run dev
```

Server will run on `http://localhost:5000`

## API Endpoints

### Get All Recipes
```
GET /api/recipes?limit=50&skip=0
```
Returns recipes from both MongoDB and JSON files.

**Query Parameters:**
- `limit`: Number of recipes to return (default: 100)
- `skip`: Number of recipes to skip (for pagination)

**Example:**
```
http://localhost:5000/api/recipes?limit=20
```

### Search Recipes by Category
```
GET /api/recipes/category/:category
```

**Example:**
```
http://localhost:5000/api/recipes/category/baking
http://localhost:5000/api/recipes/category/health
```

### Search Recipes
```
GET /api/recipes/search?query=keyword
```

**Example:**
```
http://localhost:5000/api/recipes/search?query=chicken
http://localhost:5000/api/recipes/search?query=pizza&limit=10
```

### Get Single Recipe
```
GET /api/recipes/:id
```

**Example:**
```
http://localhost:5000/api/recipes/7bac6ec3-fb66-4543-80f5-4b692de7a811
```

### Add New Recipe
```
POST /api/recipes
Content-Type: application/json

{
  "name": "My Recipe",
  "description": "A delicious recipe",
  "ingredients": ["flour", "eggs", "milk"],
  "steps": ["Mix", "Bake"],
  "image": "url-to-image"
}
```

### Health Check
```
GET /api/health
```

## Recipe Data Sources

### 1. MongoDB
Recipes stored in MongoDB `recipes` collection.

### 2. JSON Files
Recipes loaded from `/dATAbASE/JSON DATA/`:
- `baking.json` - Baking recipes
- `budget.json` - Budget-friendly recipes
- `health.json` - Healthy recipes
- `inspiration.json` - Inspiring recipes
- `recipes.json` - General recipes

## JSON Recipe Format

```json
{
  "id": "unique-id",
  "name": "Recipe Name",
  "description": "Short description",
  "author": "Author name",
  "image": "image-url",
  "ingredients": ["ingredient 1", "ingredient 2"],
  "steps": ["step 1", "step 2"],
  "rattings": 4,
  "serves": 2,
  "difficult": "Easy",
  "maincategory": "recipes"
}
```

## Troubleshooting

### MongoDB Connection Error
- Check if MongoDB is running: `mongod`
- Verify connection string in `.env`
- Make sure MongoDB URI is correct

### Port Already in Use
Change PORT in `.env` file:
```env
PORT=5001
```

### JSON Files Not Loading
- Check if `/dATAbASE/JSON DATA/` folder exists
- Verify JSON files are valid JSON format
- Check file permissions

## CORS Configuration
The server allows requests from any origin (CORS enabled). To restrict CORS:

Edit `server.js`:
```javascript
app.use(cors({
  origin: 'http://localhost:3000', // Allow only this origin
  credentials: true
}));
```

## Performance Tips
1. Use `limit` parameter to reduce data transferred
2. Use `skip` parameter for pagination
3. Search is case-insensitive
4. JSON recipes are loaded in memory for fast access

## Future Enhancements
- Add database indexing for faster searches
- Implement caching for frequent queries
- Add recipe ratings and reviews
- Add user authentication
- Add recipe filtering by difficulty, cook time, etc.
