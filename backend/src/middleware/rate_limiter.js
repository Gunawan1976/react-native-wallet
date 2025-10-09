import ratelimiter from "../config/upstash.js";

const rateLimiterMiddleware = async (req, res, next) => {
  try {
    //rate limit bisa memakai user id atau ip address
    //yang di pakai sekarang rate limit per IP
    const { success } = await ratelimiter.limit(req.ip);
    if (!success) {
      return res
        .status(429)
        .json({ message: "Too many requests, please try again later." });
    }
    next();
  } catch (error) {
    console.error("Rate Limiter Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default rateLimiterMiddleware;
