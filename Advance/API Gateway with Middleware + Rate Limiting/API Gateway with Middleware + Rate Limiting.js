const express = require("express");
const app = express();

const rateLimiter = new Map();

function middleware(req, res, next) {
  const ip = req.ip;
  const limit = 5;
  const windowMs = 10000;

  if (!rateLimiter.has(ip)) {
    rateLimiter.set(ip, []);
  }

  const timestamps = rateLimiter.get(ip);
  const now = Date.now();

  const valid = timestamps.filter(t => now - t < windowMs);

  if (valid.length >= limit) {
    return res.status(429).send("Too many requests");
  }

  valid.push(now);
  rateLimiter.set(ip, valid);

  next();
}

app.use(middleware);

app.get("/api", (req, res) => {
  res.send("Success");
});

app.listen(3000);


