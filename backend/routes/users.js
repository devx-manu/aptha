const express = require('express');
const router = express.Router();
let totalUsers = 0;

// Increment total users on visit
router.post('/visit', (req, res) => {
  totalUsers += 1;
  res.json({ totalUsers });
});

// Get total users
router.get('/total', (req, res) => {
  res.json({ totalUsers });
});

module.exports = router;
