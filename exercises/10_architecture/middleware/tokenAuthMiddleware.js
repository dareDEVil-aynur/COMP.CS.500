// middleware/tokenAuthMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    // Check if the token is missing
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    const token = authHeader.split(' ')[1];
    
    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            // If the token is invalid
            return res.status(401).json({ message: 'Access denied' });
        }
        
        // Attach the user to the request if the token is valid
        req.user = user;
        next();
    });
};
