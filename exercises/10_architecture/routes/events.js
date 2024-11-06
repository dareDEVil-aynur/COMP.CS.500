// routes/events.js
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const sessionAuthMiddleware = require('../middleware/sessionAuthMiddleware');

// Protect all routes in this file with sessionAuthMiddleware
router.get('/events', sessionAuthMiddleware, eventController.all);
router.get('/events/create', sessionAuthMiddleware, eventController.create);
router.post('/events', sessionAuthMiddleware, eventController.store);
router.get('/events/:id', sessionAuthMiddleware, eventController.edit);
router.post('/events/:id', sessionAuthMiddleware, eventController.update);
router.post('/events/:id/delete', sessionAuthMiddleware, eventController.delete);

module.exports = router;
