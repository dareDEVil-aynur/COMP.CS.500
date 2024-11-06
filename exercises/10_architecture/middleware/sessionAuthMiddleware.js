// middleware/sessionAuthMiddleware.js

module.exports = (req, res, next) => {
    // Check if user is authenticated
    if (req.session && req.session.user) {
        return next(); // Allow access to the route
    }
    // Redirect to login if user is not authenticated
    return res.redirect('/login');
};
