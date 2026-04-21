// =========================================
// BACKEND SERVER - COMPLETE EXPRESS SETUP 
// =========================================
// PURPOSE: Main entry point for the recipe API server
// WHAT IT DOES:
//  1. Loads environment variables (.env file)
//  2. Connects to MongoDB database
//  3. Sets up Express server with middleware
//  4. Mounts API routes (/api/recipes)
//  5. Handles errors globally
//  6. Starts server on port 5000

const express = require('express');     // Web server framework
const mongoose = require('mongoose');   // MongoDB ORM (Object Relational Mapper)
const cors = require('cors');           // Enable frontend-backend communication
const dotenv = require('dotenv');       // Load .env variables securely

// Load environment variables from .env file (MONGODB_URI, PORT)
dotenv.config();

// Import routes
const recipeRoutes = require('./routes/recipes.js');  // CRUD routes for recipes

// Initialize Express app
const app = express();

// ================= MIDDLEWARE SETUP =================
// Middleware processes incoming requests BEFORE they reach routes
// 1. CORS: Allows frontend (port 3000) to talk to backend (port 5000)
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:5500'],  // Frontend URLs
  credentials: true
}));

// 2. Body Parser: Converts JSON form data → JavaScript objects
app.use(express.json({ limit: '10mb' }));  // 10MB limit for images
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ================= DATABASE CONNECTION =================
// Connect to MongoDB (local or Atlas cloud)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/super-recipe')
  .then(() => {
    console.log('✅ MongoDB Connected Successfully!');
  })
  .catch((error) => {
    console.error('❌ MongoDB Connection Failed:', error.message);
    process.exit(1);  // Exit if database fails
  });

// ================= API ROUTES =================
// Mount routes at /api prefix
// All recipe endpoints will be: /api/recipes, /api/recipes/:id, etc.
app.use('/api/recipes', recipeRoutes);

// ================= HEALTH CHECK =================
// Simple endpoint to test if server is running
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'SUPER.RECIPE Backend API is running! 🚀',
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// ================= 404 HANDLER =================
// Catch-all for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.originalUrl} not found`
  });
});

// ================= GLOBAL ERROR HANDLER =================
// Catches ALL errors and sends clean JSON response
app.use((error, req, res, next) => {
  console.error('🚨 Server Error:', error);
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : error.message
  });
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🗄️ MongoDB: ${mongoose.connection.host}`);
});

module.exports = app;
