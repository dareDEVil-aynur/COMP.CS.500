// Import the express-session module
const session = require('express-session');
require('dotenv').config(); // Load environment variables from .env file

// Define session configuration
const sessionConfig = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
});

// Export sessionConfig
module.exports = sessionConfig;
