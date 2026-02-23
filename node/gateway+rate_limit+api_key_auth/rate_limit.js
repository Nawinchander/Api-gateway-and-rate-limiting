function createLimiter(limit, windowMs) {
  const store = {};

  return function(ip) {
    const now = Date.now();

    if (!store[ip]) {
      store[ip] = { count: 1, start: now };
      return true;
    }

    if (now - store[ip].start > windowMs) {
      store[ip] = { count: 1, start: now };
      return true;
    }

    store[ip].count++;
    return store[ip].count <= limit;
  };
}