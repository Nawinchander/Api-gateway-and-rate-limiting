// Queue storage
const queue = [];

// Store processed message IDs
const processed = new Set();

// PRODUCER
function sendMessage(id, payload) {
    queue.push({ id, payload });
    console.log("Sent:", id, payload);
}

// WORKER DELAY (simulate async job)
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// CONSUMER WITH DUPLICATION CHECK
async function processQueue() {

    while (queue.length > 0) {

        const msg = queue.shift();

        // Deduplication check
        if (processed.has(msg.id)) {
            console.log("Duplicate skipped:", msg.id);
            continue;
        }

        console.log("Processing:", msg.id, msg.payload);

        await wait(1000); // simulate work

        processed.add(msg.id);

        console.log("Done:", msg.id);
    }
}



sendMessage(1, "Order Created");
sendMessage(2, "Payment Done");
sendMessage(1, "Order Created AGAIN"); // duplicate
sendMessage(3, "Send Email");
sendMessage(2, "Payment AGAIN"); // duplicate

processQueue();