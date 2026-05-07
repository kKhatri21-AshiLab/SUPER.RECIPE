/**
 * ========================================
 * SUPER.RECIPE BACKEND API SERVER
 * ========================================
 * This Node.js server provides API endpoints
 * to fetch recipes from:
 * 1. MongoDB database
 * 2. JSON files in dATAbASE/JSON DATA/ folder
 * 
 * FEATURES:
 * - GET /api/recipes - Fetch all recipes
 * - GET /api/recipes/:category - Fetch by category
 * - GET /api/recipes/search/:query - Search recipes
 * - POST /api/recipes - Add new recipe
 * - GET /api/recipes/id/:id - Get single recipe
 * 
 * SETUP:
 * 1. Install dependencies: npm install
 * 2. Update .env with MongoDB URI
 * 3. Start server: npm run dev
 * 4. Server runs on http://localhost:5000
 * ========================================
 */

import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// ========================================
// SETUP & CONFIGURATION
// ========================================
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/recipes';

// Get current directory (needed for ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ========================================
// MIDDLEWARE
// ========================================
// Enable CORS - allows frontend to make requests to this server
app.use(cors());
// Parse JSON request bodies
app.use(express.json());
// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, '../')));

// ========================================
// MONGODB CONNECTION
// ========================================
let mongoClient = null;
let recipesDb = null;

// BEGINNER NOTE: Async function to connect to MongoDB
async function connectMongoDB() {
    try {
        if (!mongoClient) {
            mongoClient = new MongoClient(MONGODB_URI);
            await mongoClient.connect();
            recipesDb = mongoClient.db('recipes');
            console.log('✓ Connected to MongoDB');
        }
        return recipesDb;
    } catch (error) {
        console.error('✗ MongoDB connection error:', error.message);
        return null;
    }
}

// ========================================
// LOAD JSON RECIPES FROM FILES
// ========================================
// BEGINNER NOTE: Load all JSON recipe files into memory for fast access
let jsonRecipes = [];

async function loadJsonRecipes() {
    try {
        const jsonDir = path.join(__dirname, '../dATAbASE/JSON DATA');
        
        // Check if directory exists
        if (!fs.existsSync(jsonDir)) {
            console.warn('⚠ JSON DATA folder not found');
            return;
        }

        // Read all .json files
        const files = fs.readdirSync(jsonDir).filter(f => f.endsWith('.json'));
        
        for (const file of files) {
            const filePath = path.join(jsonDir, file);
            const data = fs.readFileSync(filePath, 'utf-8');
            const recipes = JSON.parse(data);
            
            // Add category from filename (e.g., baking.json → category: baking)
            const category = file.replace('.json', '');
            const recipesWithCategory = recipes.map(r => ({
                ...r,
                category: r.maincategory || category,
                source: 'json'
            }));
            
            jsonRecipes = jsonRecipes.concat(recipesWithCategory);
        }
        
        console.log(`✓ Loaded ${jsonRecipes.length} recipes from JSON files`);
    } catch (error) {
        console.error('✗ Error loading JSON recipes:', error.message);
    }
}

// ========================================
// API ENDPOINTS
// ========================================

// BEGINNER NOTE: Root endpoint - test if server is running
app.get('/', (req, res) => {
    res.json({
        message: 'SUPER.RECIPE API Server Running',
        version: '1.0.0',
        endpoints: {
            getAllRecipes: '/api/recipes',
            getByCategory: '/api/recipes/category/:category',
            searchRecipes: '/api/recipes/search?query=keyword',
            getRecipeById: '/api/recipes/:id',
            addRecipe: 'POST /api/recipes',
            health: '/api/health'
        }
    });
});

/**
 * GET /api/recipes
 * Fetch all recipes (combined from MongoDB + JSON files)
 * Query params:
 *   - limit: number of recipes to return (default: 100)
 *   - skip: number to skip (for pagination)
 */
app.get('/api/recipes', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 100;
        const skip = parseInt(req.query.skip) || 0;

        let allRecipes = [];

        // Try to fetch from MongoDB
        const db = await connectMongoDB();
        if (db) {
            try {
                const mongoRecipes = await db
                    .collection('recipes')
                    .find({})
                    .skip(skip)
                    .limit(limit)
                    .toArray();
                allRecipes = allRecipes.concat(mongoRecipes.map(r => ({ ...r, source: 'mongodb' })));
            } catch (mongoError) {
                console.warn('Could not fetch from MongoDB:', mongoError.message);
            }
        }

        // Add JSON recipes (limit to avoid too many results)
        const remainingLimit = limit - allRecipes.length;
        if (remainingLimit > 0) {
            allRecipes = allRecipes.concat(jsonRecipes.slice(skip, skip + remainingLimit));
        }

        res.json({
            success: true,
            count: allRecipes.length,
            recipes: allRecipes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * GET /api/recipes/category/:category
 * Fetch recipes by category (e.g., /api/recipes/category/baking)
 */
app.get('/api/recipes/category/:category', async (req, res) => {
    try {
        const category = req.params.category.toLowerCase();
        const limit = parseInt(req.query.limit) || 50;

        let recipes = [];

        // Try MongoDB
        const db = await connectMongoDB();
        if (db) {
            try {
                const mongoRecipes = await db
                    .collection('recipes')
                    .find({
                        $or: [
                            { category: category },
                            { maincategory: category },
                            { subcategory: category }
                        ]
                    })
                    .limit(limit)
                    .toArray();
                recipes = recipes.concat(mongoRecipes);
            } catch (mongoError) {
                console.warn('MongoDB search error:', mongoError.message);
            }
        }

        // Filter JSON recipes
        const jsonFiltered = jsonRecipes
            .filter(r => 
                (r.category && r.category.toLowerCase() === category) ||
                (r.maincategory && r.maincategory.toLowerCase() === category) ||
                (r.subcategory && r.subcategory.toLowerCase() === category)
            )
            .slice(0, limit - recipes.length);

        recipes = recipes.concat(jsonFiltered);

        res.json({
            success: true,
            category: category,
            count: recipes.length,
            recipes: recipes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * GET /api/recipes/search?query=keyword
 * Search recipes by name, ingredients, or description
 */
app.get('/api/recipes/search', async (req, res) => {
    try {
        const query = req.query.query || '';
        const limit = parseInt(req.query.limit) || 50;

        if (!query) {
            return res.status(400).json({
                success: false,
                error: 'Search query required'
            });
        }

        let recipes = [];
        const searchRegex = new RegExp(query, 'i'); // Case-insensitive search

        // Try MongoDB
        const db = await connectMongoDB();
        if (db) {
            try {
                const mongoRecipes = await db
                    .collection('recipes')
                    .find({
                        $or: [
                            { name: searchRegex },
                            { description: searchRegex },
                            { ingredients: searchRegex }
                        ]
                    })
                    .limit(limit)
                    .toArray();
                recipes = recipes.concat(mongoRecipes);
            } catch (mongoError) {
                console.warn('MongoDB search error:', mongoError.message);
            }
        }

        // Search JSON recipes
        const jsonMatches = jsonRecipes
            .filter(r =>
                (r.name && searchRegex.test(r.name)) ||
                (r.description && searchRegex.test(r.description)) ||
                (r.ingredients && JSON.stringify(r.ingredients).match(searchRegex))
            )
            .slice(0, limit - recipes.length);

        recipes = recipes.concat(jsonMatches);

        res.json({
            success: true,
            query: query,
            count: recipes.length,
            recipes: recipes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * GET /api/recipes/:id
 * Get a single recipe by ID
 */
app.get('/api/recipes/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // Try MongoDB first
        const db = await connectMongoDB();
        if (db) {
            try {
                const { ObjectId } = require('mongodb');
                const recipe = await db.collection('recipes').findOne({ _id: new ObjectId(id) });
                if (recipe) {
                    return res.json({ success: true, recipe });
                }
            } catch (mongoError) {
                // If not valid MongoDB ID format, continue to JSON search
            }
        }

        // Search JSON recipes
        const recipe = jsonRecipes.find(r => r.id === id);
        if (recipe) {
            return res.json({ success: true, recipe });
        }

        res.status(404).json({
            success: false,
            error: 'Recipe not found'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * POST /api/recipes
 * Add a new recipe to MongoDB
 */
app.post('/api/recipes', async (req, res) => {
    try {
        const recipe = req.body;

        // Validate required fields
        if (!recipe.name) {
            return res.status(400).json({
                success: false,
                error: 'Recipe name is required'
            });
        }

        const db = await connectMongoDB();
        if (!db) {
            return res.status(500).json({
                success: false,
                error: 'Database connection failed'
            });
        }

        // Add timestamp
        recipe.createdAt = new Date();

        const result = await db.collection('recipes').insertOne(recipe);

        res.json({
            success: true,
            message: 'Recipe added successfully',
            id: result.insertedId,
            recipe: { ...recipe, _id: result.insertedId }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * GET /api/health
 * Health check endpoint
 */
app.get('/api/health', async (req, res) => {
    try {
        const db = await connectMongoDB();
        const mongoConnected = db !== null;
        const jsonCount = jsonRecipes.length;

        res.json({
            success: true,
            status: 'Server is running',
            mongodb: mongoConnected ? 'Connected' : 'Disconnected',
            jsonRecipesLoaded: jsonCount,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// ========================================
// ERROR HANDLING & SERVER START
// ========================================

// Handle 404 - page not found
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found',
        path: req.path
    });
});

// Start server
async function startServer() {
    try {
        // Load JSON recipes first
        await loadJsonRecipes();

        // Try to connect to MongoDB
        await connectMongoDB();

        // Start listening
        app.listen(PORT, () => {
            console.log('\n========================================');
            console.log('✓ SUPER.RECIPE API SERVER STARTED');
            console.log('========================================');
            console.log(`🌐 Server: http://localhost:${PORT}`);
            console.log(`📝 API Docs: http://localhost:${PORT}/api/recipes`);
            console.log(`❤️ Health Check: http://localhost:${PORT}/api/health`);
            console.log('========================================\n');
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();
