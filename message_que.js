/// basic que

// Message Queue (array used as queue)
const messageQueue = [];

// PRODUCER → adds message to queue
function produceMessage(msg) {
    console.log("Produced:", msg);
    messageQueue.push(msg);
}

// CONSUMER → takes message from queue
function consumeMessage() {
    if (messageQueue.length === 0) {
        console.log("No messages to consume");
        return;
    }

    const msg = messageQueue.shift(); // FIFO
    console.log("Consumed:", msg);
}

// SIMULATE SYSTEM

// Producer sending messages
produceMessage("Order Created");
produceMessage("Payment Success");
produceMessage("Send Email");

// Consumer processing messages slowly
setTimeout(consumeMessage, 1000);
setTimeout(consumeMessage, 2000);
setTimeout(consumeMessage, 3000);
setTimeout(consumeMessage, 4000);