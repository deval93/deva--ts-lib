import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 50,
  message: "You have exceeded the 50 requests in 1 min limit!",
  standardHeaders: true,
  legacyHeaders: false,
});

