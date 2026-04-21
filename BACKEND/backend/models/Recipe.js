// =========================================
// RECIPE MODEL - MONGOOSE SCHEMA
// =========================================
// PURPOSE: Defines the structure of recipe documents in MongoDB
// WHAT IT DOES:
//  - Specifies fields (title, ingredients, etc) and their types
//  - Adds validation (required: true, unique: true)
//  - Creates full-text search index for title/description/ingredients
//  - Auto-generates timestamps

const mongoose = require('mongoose');  // MongoDB Object-Document Mapper (ODM)

/**
 * Recipe Schema - Structure of each recipe document in MongoDB
 * FIELDS EXPLAINED:
 *  - title: Recipe name (required, displayed everywhere)
 *  - slug: URL-friendly version (e.g. \"apple-pie\" from \"Apple Pie\")
 *  - description: Short summary (appears in search results)
 *  - prepTime/cookTime: Cooking times in minutes (numbers only)
 *  - servings: How many people it serves
 *  - difficulty: \"Easy\", \"Medium\", \"Hard\" 
 *  - ingredients: Array of strings (one per line from form)
 *  - instructions: Array of step objects (with optional images/videos)
 *  - categories/tags: For filtering/search
 *  - nutrition: Calories/protein/carbs (defaults provided)
 *  - images: Cover images for recipe cards
 *  - ratings: Average rating + vote count
 *  - createdAt: Auto-timestamp when recipe saved
 */
const recipeSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,  // Cannot be empty
    trim: true       // Remove extra spaces
  },
  slug: { 
    type: String, 
    required: true, 
    unique: true,    // No duplicate slugs (prevents URL conflicts)
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500   // Limit for previews
  },
  prepTime: {
    type: Number,    // Minutes (number only)
    min: 1,
    default: 30
  },
  cookTime: {
    type: Number,
    min: 1,
    default: 30
  },
  servings: {
    type: Number,
    min: 1,
    default: 4
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],  // Only allow these values
    default: 'medium'
  },
  ingredients: [{
    type: String,
    trim: true
  }],
  instructions: [{  // Each step can have text + optional media
    description: {
      type: String,
      required: true,
      trim: true
    },
    image: {     // Optional step image URL
      type: String,
      trim: true
    },
    video: {     // Optional YouTube/video URL
      type: String,
      trim: true
    }
  }],
  categories: [{
    type: String,
    lowercase: true
  }],
  tags: [{
    type: String,
    lowercase: true
  }],
  nutrition: {
    calories: { type: Number, default: 450 },
    protein: { type: Number, default: 25 },
    carbs: { type: Number, default: 40 }
  },
  images: [{
    type: String,  // Cover image URLs
    trim: true
  }],
  author: {
    type: String,
    default: 'Anonymous User'
  },
  ratings: {
    avg: { 
      type: Number, 
      default: 0,
      min: 0,
      max: 5
    },
    count: { 
      type: Number, 
      default: 0 
    }
  },
  createdAt: { 
    type: Date, 
    default: Date.now  // Auto-set when document created
  }
}, {
  timestamps: true  // Auto-adds updatedAt field
});

/**
 * FULL-TEXT SEARCH INDEX
 * WHAT: Creates MongoDB text index on title, description, ingredients
 * WHY: Enables fast searching (e.g. search \"chicken\" finds all chicken recipes)
 * HOW: $text: { $search: \"chicken\" } in queries
 * PERFORMANCE: Much faster than regex for large collections
 */
recipeSchema.index({ 
  title: 'text', 
  description: 'text', 
  ingredients: 'text' 
});

// =========================================
// EXPORT MODEL
// =========================================
// Creates/returns 'Recipe' model class
// USAGE: const recipe = new Recipe(data); await recipe.save();
module.exports = mongoose.model('Recipe', recipeSchema);
