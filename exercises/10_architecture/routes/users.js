// routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const sessionAuthMiddleware = require('../middleware/sessionAuthMiddleware');

// Unprotected routes
router.get('/login', userController.renderLoginForm);
router.post('/login', userController.login);
router.get('/register', userController.renderRegisterForm);
router.post('/register', userController.register);

// Protected logout route
router.post('/logout', sessionAuthMiddleware, userController.logout);

module.exports = router;
