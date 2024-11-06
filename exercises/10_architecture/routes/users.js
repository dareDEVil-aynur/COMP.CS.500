// routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Map each route to a controller method
router.get('/login', userController.renderLoginForm);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/register', userController.renderRegisterForm);
router.post('/register', userController.register);

// Export the router
module.exports = router;
