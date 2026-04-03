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


// Test (Manual / Script)
// curl http://localhost:3000/api

// After 3 requests → 429 Too Many Requests

// FAANG Insight
// Can you integrate components?
// Do you understand middleware pipelines?



