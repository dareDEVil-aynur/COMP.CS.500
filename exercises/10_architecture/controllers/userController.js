// controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Render the login form
const renderLoginForm = (req, res) => {
    const errors = req.session.errors || [];
    delete req.session.errors;
    res.render('login', { title: 'Log in', errors });
};

// Authenticate the user
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
        req.session.user = user;
        return res.redirect('/');
    } else {
        req.session.errors = ['These credentials do not match our records.'];
        return res.redirect('/login');
    }
};

// Log out the user
const logout = (req, res) => {
    req.session.destroy();
    return res.redirect('/login');
};

// Render the registration form
const renderRegisterForm = (req, res) => {
    const errors = req.session.errors || [];
    delete req.session.errors;
    res.render('register', { title: 'Register a new user', errors });
};

// Register a new user
const register = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const user = new User({ email, password, name });
        await user.save();
        req.session.user = user;
        return res.redirect('/');
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = [];
            for (let field in error.errors) {
                errors.push(error.errors[field].message);
            }
            req.session.errors = errors;
            return res.redirect('/register');
        }
    }
};

module.exports = {
    renderLoginForm,
    login,
    logout,
    renderRegisterForm,
    register
};
