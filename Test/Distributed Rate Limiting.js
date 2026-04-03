// Distributed Rate Limiting (Redis) + Testing

// What you're testing
// Multi-instance consistency
// Shared state
// Redis-based Limiter


const Redis = require("ioredis");
const redis = new Redis();

async function rateLimit(userId) {
  const key = `rate:${userId}`;
  const limit = 5;
  const window = 10; // seconds

  const count = await redis.incr(key);

  if (count === 1) {
    await redis.expire(key, window);
  }

  if (count > limit) {
    return false;
  }

  return true;
}



