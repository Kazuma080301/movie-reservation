const express = require('express');
const { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } = require('../user/userValidator')
const { validateSchema } = require('../../middlewares/validateMiddleware')
const { protect } = require('./authMiddleware');
const createRateLimiter = require("../../utils/rateLimiter");
const { registerUser, loginUser, updatePassword, forgotPassword, resetPassword } = require('./authController');

// 🔹 Define a rate limiter for email-related actions
const emailLimiter = createRateLimiter(
    15 * 60 * 1000, // 15 minutes
    3, // Max 3 requests per 15 minutes per IP
    "Too many password reset requests. Please try again later."
);

const router = express.Router();

router.post('/register', validateSchema(registerSchema), registerUser);

router.post('/login', validateSchema(loginSchema), loginUser);

router.put("/update-password", protect, validateSchema(resetPasswordSchema), updatePassword);

router.post("/forgot-password", emailLimiter, validateSchema(forgotPasswordSchema), forgotPassword);

router.post("/reset-password/:token", validateSchema(resetPasswordSchema), resetPassword);

module.exports = router;