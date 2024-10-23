const express = require('express');
const router = express.Router();

const pageTitle = 'Users endpoint';
const usersList = [
  {
    id: 1,
    name: 'Matti Meikäläinen',
    address: {
      street: 'Katu 1',
      city: 'Helsinki',
      postalCode: '00100'
    },
    email: 'matti.meikalainen@example.com'
  },
  {
    id: 2,
    name: 'Liisa Virtanen',
    address: {
      street: 'Tie 2',
      city: 'Espoo',
      postalCode: '02100'
    },
    email: 'liisa.virtanen@example.com'
  },
  {
    id: 3,
    name: 'Pekka Peloton',
    address: {
      street: 'Polku 3',
      city: 'Tampere',
      postalCode: '33100'
    },
    email: 'pekka.peloton@example.com'
  }
];

// Users route
router.get('/', (req, res) => {
  res.send(usersList);
});

router.get('/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10); // Parse the ID to an integer
  const user = usersList.find((user) => user.id === userId);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ error: 'User not found' });
  }
});

module.exports = router;
