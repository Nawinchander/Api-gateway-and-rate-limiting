class LeakyBucket {
  constructor(rate) {
    this.queue = [];
    this.rate = rate;

    setInterval(() => {
      if (this.queue.length > 0) {
        const req = this.queue.shift();
        req.resolve("Processed");
      }
    }, 1000 / this.rate);
  }

  handleRequest() {
    return new Promise((resolve, reject) => {
      if (this.queue.length > 10) {
        return reject("Overflow");
      }
      this.queue.push({ resolve });
    });
  }
}

