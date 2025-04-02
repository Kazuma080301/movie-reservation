const rateLimit = require("express-rate-limit");

const createRateLimiter = (timeWindowMs, maxRequests, message) => {
    return rateLimit({
        windowMs: timeWindowMs,
        max: maxRequests,
        message: { message },
        headers: true, // Sends rate limit info in headers
        standardHeaders: true, // `RateLimit-*` headers
        legacyHeaders: false // Disable `X-RateLimit-*` headers
    });
};

module.exports = createRateLimiter;
