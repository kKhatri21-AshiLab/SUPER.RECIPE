/**
 * ============================================
 * EXPRESS SERVER - SUPER.RECIPE APPLICATION
 * ============================================
 * PURPOSE: Backend server to serve HTML frontend
 * WHAT IT DOES:
 *   1. Imports Express framework
 *   2. Creates Express app instance
 *   3. Configures middleware for JSON parsing
 *   4. Serves static files (indexMain.html, images, etc.)
 *   5. Routes GET requests to serve the main page
 *   6. Listens on port 3000 for incoming requests
 */

// ============================================
// IMPORTS
// ============================================
// Express: Web framework for Node.js
// Used to create HTTP server and handle routing
const express = require('express');
const app = express();
// PORT: Server runs on port 3000 (or custom port from environment)
const PORT = process.env.PORT || 3000;

// ============================================
// MIDDLEWARE CONFIGURATION
// ============================================
// express.json(): Parses incoming JSON requests
// Allows us to handle JSON data in request bodies
app.use(express.json());

// ============================================
// ROUTES
// ============================================
/**
 * GET / - HOME PAGE ROUTE
 * Serves the main landing page (indexMain.html)
 * This page contains:
 *   - Hero section with app branding
 *   - Ingredient tag search system
 *   - Recipe cards with API integration
 *   - Modal popup for recipe details
 */
app.get('/', (req, res) => {
  // Send indexMain.html from server root directory
  // { root: __dirname } specifies to look in current directory
  res.sendFile('indexMain.html', { root: __dirname });
});

// ============================================
// SERVER START
// ============================================
/**
 * app.listen(): Start Express server
 * Listens for HTTP requests on specified PORT
 * Logs message when server successfully starts
 */
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 Visit: http://localhost:${PORT}`);
});
