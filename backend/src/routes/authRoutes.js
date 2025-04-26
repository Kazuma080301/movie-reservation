const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const createRateLimiter = require("../utils/rateLimiter");
const { registerUser, loginUser, updatePassword, forgotPassword, resetPassword } = require('../controllers/authController');

// 🔹 Define a rate limiter for email-related actions
const emailLimiter = createRateLimiter(
    15 * 60 * 1000, // 15 minutes
    3, // Max 3 requests per 15 minutes per IP
    "Too many password reset requests. Please try again later."
);

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.put("/update-password", protect, updatePassword);

router.post("/forgot-password", emailLimiter, forgotPassword);

router.post("/reset-password/:token", resetPassword);

module.exports = router;