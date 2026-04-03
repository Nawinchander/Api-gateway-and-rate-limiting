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




