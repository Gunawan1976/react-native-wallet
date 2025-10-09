import { Redis } from "@upstash/redis";

import { Ratelimit } from "@upstash/ratelimit";

import "dotenv/config";

// Create a new ratelimiter, that allows 10 requests per 60 seconds

const ratelimiter = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(100, "60 s"),
});


export default ratelimiter;

