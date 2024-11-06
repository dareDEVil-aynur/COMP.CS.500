// controllers/apiController.js
const Event = require('../models/Event');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Return all events as JSON
exports.all = async (req, res) => {
    const events = await Event.find();
    res.json(events);
};

// Return a single event as JSON
exports.show = async (req, res) => {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
};

// Update or create an event
exports.update = async (req, res) => {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        upsert: true, // Create a new document if no document matches
        runValidators: true,
    });
    res.json(event);
};

// Authenticate user and respond with a signed JWT token
exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Invalid email or password' });
    }
};
