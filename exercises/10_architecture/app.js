const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const eventRoutes = require('./routes/events');      // Events routes
const userRoutes = require('./routes/users');        // User routes
const apiRoutes = require('./routes/api');           // API routes

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    }).catch((error) => {
        console.log("Error connecting to MongoDB:", error);
    });

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set up body-parser for handling POST data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Also accepts JSON from the tests

// Set up session management
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

// Use imported routes
app.use('/', eventRoutes);  // Mounts the events routes
app.use('/', userRoutes);   // Mounts the user routes
app.use('/', apiRoutes);    // Mounts the API routes

// Export the app for Mocha tests
module.exports = app;
