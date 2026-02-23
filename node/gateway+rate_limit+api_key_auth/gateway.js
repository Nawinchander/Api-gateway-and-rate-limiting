const limiter = createLimiter(5, 10000);

function gateway(req, res) {
  const ip = req.socket.remoteAddress;

  // rate limit check
  if (!limiter(ip)) {
    res.statusCode = 429;
    return res.end("Too many requests");
  }

  // api key check
  if (!validateApiKey(req)) {
    res.statusCode = 401;
    return res.end("Invalid API key");
  }

  // routing
  if (req.url === "/data") {
    res.end(JSON.stringify({ data: "secure data" }));
  } else {
    res.statusCode = 404;
    res.end("Not found");
  }
}

require("http").createServer(gateway).listen(3003);