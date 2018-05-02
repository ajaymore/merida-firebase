const express = require('express');

const router = express.Router();
const { isLoggedIn } = require('../utils');

router.get('/protected-route', isLoggedIn, (req, res) => {
  res.send({ message: 'You are indeed authenticated!' });
});

module.exports = router;
