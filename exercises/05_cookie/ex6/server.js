const express = require('express');
const session = require('express-session');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

// Initialize the session middleware
app.use(
  session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }, // Session valid for 1 minute
  })
);

// Route: Home Page
app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to the Session Management App</h1>
    <p><a href="/login">Login</a> | <a href="/logout">Logout</a> | <a href="/profile">Profile</a></p>
  `);
});

// Route: Login Page (GET request)
// - If logged in: redirect to /profile page
// - If not logged in: display htmlForm for the login page
app.get('/login', (req, res) => {
  if (req.session.username) {
    // If already logged in, redirect to profile
    return res.redirect('/profile');
  }

  const htmlForm = `
    <h2>Login</h2>
    <form method="POST" action="/login">
      <label>Username:</label>
      <input type="text" name="username" required>
      <button type="submit">Login</button>
    </form>
  `;
  res.send(htmlForm);
});

// Route: Login (POST request)
// - Handle the login and store the username in the session
// - Redirect to the /profile page after login
app.post('/login', (req, res) => {
  const { username } = req.body;

  if (username) {
    // Store the username in the session
    req.session.username = username;
    // Redirect to the profile page
    return res.redirect('/profile');
  }

  res.send('Login failed. Please provide a username.');
});

// Route: Profile Page (GET request)
// - If logged in: display the profile page
// - If not logged in: redirect to /login page
app.get('/profile', (req, res) => {
  if (req.session.username) {
    const profilePage = `
      <h2>Profile</h2>
      <p>Welcome, ${req.session.username}!</p>
      <p><a href="/logout">Logout</a></p>
    `;
    res.send(profilePage);
  } else {
    // If not logged in, redirect to login page
    res.redirect('/login');
  }
});

// Route: Logout (GET request)
// - Destroy the session and redirect to home
app.get('/logout', (req, res) => {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      return res.send('Error logging out');
    }
    // Redirect to home after logout
    res.redirect('/');
  });
});

// DO NOT MODIFY BELOW THIS LINE
// Conditionally start the server if this script is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// For Plussa grader
module.exports = app;
