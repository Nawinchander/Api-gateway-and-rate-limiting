// Unit Testing – Rate Limiter Logic (Token Bucket)

// What you're testing
// Correct token refill
// Reject when limit exceeded
// Implementation

class TokenBucket {
  constructor(capacity, refillRate) {
    this.capacity = capacity;
    this.tokens = capacity;
    this.refillRate = refillRate; // tokens per second
    this.lastRefill = Date.now();
  }

  allowRequest() {
    this.refill();

    if (this.tokens > 0) {
      this.tokens--;
      return true;
    }
    return false;
  }

  refill() {
    const now = Date.now();
    const delta = (now - this.lastRefill) / 1000;
    const refillTokens = delta * this.refillRate;

    this.tokens = Math.min(this.capacity, this.tokens + refillTokens);
    this.lastRefill = now;
  }
}

// Test
const bucket = new TokenBucket(2, 1);

console.log(bucket.allowRequest()); // true
console.log(bucket.allowRequest()); // true
console.log(bucket.allowRequest()); // false ❌ limit hit


// FAANG Insight
// Interviewers want to see:

// Time-based correctness
// Edge case: burst vs steady traffic



