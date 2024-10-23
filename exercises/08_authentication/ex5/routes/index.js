const express = require('express');
const router = express.Router();

const pageTitle = 'USERS API';

// Home route
router.get('/', (req, res) => {
  const localPageTitle = 'users API';
  res.send(`Welcome to ${localPageTitle}. You can query for user data at the /users and /users/:id endpoints`);
});

module.exports = router;
