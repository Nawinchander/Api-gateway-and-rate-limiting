// Integration Testing – API Gateway + Rate Limiter

// What you're testing
// Gateway correctly blocks requests
// Middleware chaining

const express = require("express");
const app = express();

const limiter = new TokenBucket(3, 1);

app.use((req, res, next) => {
  if (!limiter.allowRequest()) {
    return res.status(429).send("Too Many Requests");
  }
  next();
});

app.get("/api", (req, res) => {
  res.send("Success");
});

app.listen(3000);



