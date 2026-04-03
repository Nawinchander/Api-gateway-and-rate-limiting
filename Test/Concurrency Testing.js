// Concurrency Testing – Race Conditions

// What you're testing
// Multiple simultaneous requests
// Thread safety (even in Node async world)


let counter = 0;

async function fakeRequest() {
  const temp = counter;
  await new Promise(r => setTimeout(r, 10)); // simulate delay
  counter = temp + 1;
}

async function testRace() {
  await Promise.all(
    Array.from({ length: 10 }, fakeRequest)
  );

  console.log(counter); // ❌ often < 10
}

testRace();


/// fix atomic - like - logic


const mutex = require("async-mutex").Mutex;
const lock = new mutex();

async function safeRequest() {
  await lock.runExclusive(async () => {
    counter++;
  });
}

// FAANG Insight

// Interviewers LOVE this:

// “What happens in concurrent requests?”
// Shows distributed systems thinking



