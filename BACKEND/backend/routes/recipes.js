// =========================================
// RECIPE ROUTES - COMPLETE CRUD API
// =========================================
// PURPOSE: Handles all recipe operations (Create, Read, Update, Delete)
// ENDPOINTS:
//  GET    /api/recipes           → List all recipes (search/filter)
//  GET    /api/recipes/:id       → Single recipe details  
//  POST   /api/recipes           → Create new recipe (from ADD RECIPE PAGE)
//  PUT    /api/recipes/:id       → Update existing recipe
//  DELETE /api/recipes/:id       → Delete recipe

const express = require('express');           // Express routing framework
const router = express.Router();              // Create router instance
const Recipe = require('../models/Recipe');   // Import Recipe model

// =========================================
// HELPER FUNCTIONS
// =========================================

/**
 * GENERATE SLUG
 * WHAT: Converts title → URL-friendly string (apple-pie)
 * WHY: URLs can't have spaces/special chars (becomes /api/recipes/apple-pie)
 * EXAMPLE: \"Apple Cinnamon Pancakes\" → \"apple-cinnamon-pancakes\"
 */
const generateSlug = (title) => {
  return title.toLowerCase()        // \"Apple\" → \"apple\"
    .trim()                        // Remove leading/trailing spaces
    .replace(/[^\\w\\s-]/g, '')     // Remove special chars (!@#$%)
    .replace(/[\\s_-]+/g, '-')      // Multiple spaces → single dash
    .replace(/^-+|-+$/g, '');       // Remove dashes from start/end
};

/**
 * PARSE TIME
 * WHAT: Converts \"30 min\" → 30 (number)
 * WHY: Frontend sends strings, database needs numbers
 * VALIDATION: Limits 5-300 minutes (realistic cooking times)
 */
const parseTime = (timeStr) => {
  const num = parseInt(timeStr.match(/\\d+/)?.[0] || '30');  // Extract first number
  return Math.max(5, Math.min(300, num));                    // Clamp 5-300 min
};

// =========================================
// GET ALL RECIPES (with search/filter)
// =========================================
// URL: GET /api/recipes
// Query: ?search=chicken&category=dinner
// RETURNS: Array of recipes (max 20 newest first)
router.get('/', async (req, res) => {
  try {
    const { search, category } = req.query;  // Get query params
    let query = {};                          // MongoDB query object

    // FULL-TEXT SEARCH (uses index from model)
    if (search) {
      query.$text = { $search: search };
    }
    
    // CATEGORY FILTER
    if (category) {
      query.categories = category;
    }

    // EXECUTE QUERY
    const recipes = await Recipe.find(query)
      .sort({ createdAt: -1 })               // Newest first
      .limit(20);                            // Pagination (first page)

    res.json({ success: true, recipes });    // Standard API response format
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// =========================================
// GET SINGLE RECIPE
// =========================================
// URL: GET /api/recipes/507f1f77bcf86cd799439011
router.get('/:id', async (req, res) => {
  try {
    // Find by MongoDB ObjectId (24-char hex string)
    const recipe = await Recipe.findById(req.params.id);
    
    if (!recipe) {
      return res.status(404).json({ 
        success: false, 
        error: 'Recipe not found' 
      });
    }
    
    res.json({ success: true, recipe });
  } catch (error) {
    // Invalid ObjectId format
    res.status(500).json({ success: false, error: error.message });
  }
});

// =========================================
// CREATE NEW RECIPE (Main endpoint for ADD RECIPE PAGE)
// =========================================
// URL: POST /api/recipes
// BODY: Form data from frontend (multipart/form-data or JSON)
router.post('/', async (req, res) => {
  try {
    // DESTRUCTURE REQUEST BODY (matches frontend form)
    const { 
      title, description, totalTime, difficulty, tags, 
      ingredients, instructions, image, stepImages, stepVideos 
    } = req.body;

    // VALIDATION: Check required fields
    if (!title || !description || !ingredients?.length || !instructions?.length) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: title, description, ingredients, instructions' 
      });
    }

    // BUILD RECIPE DATA (maps frontend → database schema)
    const recipeData = {
      title,                             // From form
      slug: generateSlug(title),         // Auto-generate URL slug
      description,
      prepTime: parseTime(totalTime),    // \"30 min\" → 30
      cookTime: parseTime(totalTime),    // Assume same as prep for now
      servings: 4,                       // Frontend default
      difficulty: difficulty?.toLowerCase() || 'medium',
      ingredients,                       // Array from textarea (split by \\n)
      // MAP INSTRUCTIONS: Match step images/videos by index
      instructions: instructions.map((desc, i) => ({
        description: desc,
        image: stepImages?.[i] || '',    // Optional image per step
        video: stepVideos?.[i] || ''     // Optional video per step
      })).filter(step => step.description.trim()),  // Remove empty steps
      categories: [],                    // Add UI later
      tags: tags || [],                  // Comma-separated → array
      nutrition: { 
        calories: 450, protein: 25, carbs: 40  // Smart defaults
      },
      images: image ? [image] : [],      // Cover image array
      author: 'User',                    // Add auth later
    };

    // SAVE TO DATABASE
    const newRecipe = new Recipe(recipeData);
    const savedRecipe = await newRecipe.save();

    // 201 = \"Created Successfully\"
    res.status(201).json({ success: true, recipe: savedRecipe });
    
  } catch (error) {
    // HANDLE DUPLICATE SLUG (MongoDB error code 11000)
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        error: 'Recipe title already exists (unique slug conflict)' 
      });
    }
    // OTHER ERRORS (validation, network, etc)
    res.status(500).json({ success: false, error: error.message });
  }
});

// =========================================
// UPDATE RECIPE
// =========================================
// URL: PUT /api/recipes/507f1f77bcf86cd799439011
// BODY: Updated fields only (partial update)
router.put('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,     // MongoDB ID from URL
      req.body,          // Updated fields from request body
      { 
        new: true,       // Return updated document (not old one)
        runValidators: true  // Re-run schema validation
      }
    );
    
    if (!recipe) {
      return res.status(404).json({ success: false, error: 'Recipe not found' });
    }
    
    res.json({ success: true, recipe });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// =========================================
// DELETE RECIPE
// =========================================
// URL: DELETE /api/recipes/507f1f77bcf86cd799439011
router.delete('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    
    if (!recipe) {
      return res.status(404).json({ success: false, error: 'Recipe not found' });
    }
    
    res.json({ success: true, message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// =========================================
// EXPORT ROUTER
// =========================================
// Mounted in server.js: app.use('/api/recipes', recipeRoutes);
module.exports = router;
