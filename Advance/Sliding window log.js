class SlidingWindowLog {
  constructor(limit, windowMs) {
    this.limit = limit;
    this.windowMs = windowMs;
    this.logs = [];
  }

  allowRequest() {
    const now = Date.now();

    // Remove old logs
    this.logs = this.logs.filter(ts => now - ts < this.windowMs);

    if (this.logs.length < this.limit) {
      this.logs.push(now);
      return true;
    }
    return false;
  }
}


