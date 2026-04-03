// Load Testing – Simulating High Traffic

// What you're testing
// System behavior under load
// Rate limiter fairness

const axios = require("axios");

async function loadTest() {
  const requests = [];

  for (let i = 0; i < 20; i++) {
    requests.push(
      axios.get("http://localhost:3000/api")
        .then(() => "OK")
        .catch(err => err.response.status)
    );
  }

  const results = await Promise.all(requests);
  console.log(results);
}

loadTest();

/// expected op - ["OK", "OK", "OK", 429, 429, 429, ...]

// FAANG Insight - This shows:

// Burst traffic handling
// Throttling effectiveness



