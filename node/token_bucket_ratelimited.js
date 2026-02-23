function createTokenBucket(maxTokens, refillRate, intervalMs) {
  const buckets = new Map();

  setInterval(() => {
    buckets.forEach(bucket => {
      bucket.tokens = Math.min(maxTokens, bucket.tokens + refillRate);
    });
  }, intervalMs);

  return function allow(ip) {
    if (!buckets.has(ip)) {
      buckets.set(ip, { tokens: maxTokens });
    }

    const bucket = buckets.get(ip);

    if (bucket.tokens > 0) {
      bucket.tokens--;
      return true;
    }

    return false;
  };
}