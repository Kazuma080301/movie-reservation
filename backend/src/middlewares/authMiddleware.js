const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]; // Extract token
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token

            req.user = await User.findById(decoded.id).select('-password'); // Attach user to request
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Unauthorized: Invalid Token' });
        }
    } else {
        return res.status(401).json({ message: 'Unauthorized: No Token Provided' });
    }
};

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied" });
        }
        next();
    };
};

module.exports = { protect, authorize };