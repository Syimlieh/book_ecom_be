const rateLimit = require("express-rate-limit");

// Apply to all requests
exports.rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        statusCode: 429,
        message: "Too many requests. Please try again later.",
    },
});
