const redis = require("redis");
const client = redis.createClient();

async function allowRequest(userId) {
  const key = `rate:${userId}`;
  const limit = 5;
  const window = 10; // seconds

  const count = await client.incr(key);

  if (count === 1) {
    await client.expire(key, window);
  }

  return count <= limit;
}

