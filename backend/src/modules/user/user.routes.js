const express = require('express');
const User = require('./User'); // Import User Model
const { protect } = require('../auth/auth.middleware');

const router = express.Router();

// Create User API
router.get('/profile', protect, async (req, res) => {
    res.json({ message: 'User Profile Access Granted', user: req.user });
});

module.exports = router;