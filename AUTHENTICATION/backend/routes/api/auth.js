const express = require('express');
const router = express.Router();

// Temporary route handlers until controllers are implemented
router.post('/register', (req, res) => {
  res.json({ message: 'Register endpoint' });
});

router.post('/login', (req, res) => {
  res.json({ message: 'Login endpoint' });
});

router.post('/google', (req, res) => {
  res.json({ message: 'Google auth endpoint' });
});

router.get('/me', (req, res) => {
  res.json({ message: 'Get user profile endpoint' });
});

module.exports = router;