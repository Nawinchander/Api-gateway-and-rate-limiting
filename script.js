//// rate limiter 

function createRateLimiter(limit, windowMs) {
  const requests = new Map(); // private via closure

  return function rateLimit(ip) {
    const now = Date.now();

    if (!requests.has(ip)) {
      requests.set(ip, []);
    }

    const timestamps = requests.get(ip);

    // remove old timestamps
    const valid = timestamps.filter(t => now - t < windowMs);
    valid.push(now);

    requests.set(ip, valid);

    return valid.length <= limit;
  };
}

/// fake backend services

async function userService(req, res) {
  res.end(JSON.stringify({ service: "User Service", ok: true }));
}

async function productService(req, res) {
  res.end(JSON.stringify({ service: "Product Service", ok: true }));
}


//// API gateway router


function createGateway(services, rateLimiter) {
  return async function gatewayHandler(req, res) {
    const ip = req.socket.remoteAddress;

    // rate limiting check
    if (!rateLimiter(ip)) {
      res.statusCode = 429;
      res.end("Too many requests");
      return;
    }

    // routing
    const url = req.url;

    if (services[url]) {
      await services[url](req, res);
    } else {
      res.statusCode = 404;
      res.end("Not Found");
    }
  };
}


///// create server + wire everything

const http = require("http");

// create limiter: 5 requests per 10 sec
const rateLimiter = createRateLimiter(5, 10000);

// register services
const services = {
  "/users": userService,
  "/products": productService
};

// create gateway
const gateway = createGateway(services, rateLimiter);

// start server
http.createServer(gateway).listen(3000, () => {
  console.log("API Gateway running on port 3000");
});

