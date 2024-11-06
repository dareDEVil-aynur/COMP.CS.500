// routes/api.js
const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');
const tokenAuthMiddleware = require('../middleware/tokenAuthMiddleware');

// Protected routes
router.get('/api/events', tokenAuthMiddleware, apiController.all);
router.get('/api/events/:id', tokenAuthMiddleware, apiController.show);
router.put('/api/events/:id', tokenAuthMiddleware, apiController.update);

// Public route for login
router.post('/api/login', apiController.login);

module.exports = router;
