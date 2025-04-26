const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const sendEmail = require("../utils/emailService");

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({ name, email, password: hashedPassword, role: "Customer" });
        await newUser.save();

        res.status(201).json({
            message: 'User registered successfully',
            token: generateToken(newUser._id),  // 🔥 Return JWT token
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        res.json({
            message: 'Login successful',
            token: generateToken(user._id),  // 🔥 Return JWT token
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updatePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        // 1️⃣ Find the authenticated user
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: "User not found" });

        // 2️⃣ Check if old password is correct
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) return res.status(400).json({ message: "Old password is incorrect" });

        // 3️⃣ Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // 4️⃣ Update the password in the database
        user.password = hashedPassword;
        await user.save();

        res.json({ message: "Password updated successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error updating password", error });
    }
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate a reset token
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    const resetLink = `${process.env.FRONTEND_URL}/api/auth/reset-password/${resetToken}`;

    // Send email
    setImmediate(async () => {
        try {
            await sendEmail(
                user.email,
                "Password Reset Request",
                `<p>Click <a href="${resetLink}">here</a> to reset your password. This link expires in 1 hour.</p>`
            );
            console.log(`📩 Password reset email sent to ${user.email}`);
        } catch (error) {
            console.error("❌ Failed to send reset email:", error);
        }
    });

    res.json({ message: "Password reset link sent to email" });
};

const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        // 1️⃣ Verify Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) return res.status(400).json({ message: "Invalid or expired token" });

        // 2️⃣ Hash and Save New Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        res.json({ message: "Password reset successful" });

    } catch (error) {
        res.status(400).json({ message: "Invalid or expired token", error });
    }
};

module.exports = { registerUser, loginUser, updatePassword, forgotPassword, resetPassword };