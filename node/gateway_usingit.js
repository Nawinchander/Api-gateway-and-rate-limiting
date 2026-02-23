const http = require("http");

const allow = createTokenBucket(10, 2, 5000); 
// 10 max tokens, refill 2 every 5 sec

function gateway(req, res) {
  const ip = req.socket.remoteAddress;

  if (!allow(ip)) {
    res.statusCode = 429;
    return res.end("Rate limit exceeded");
  }

  if (req.url === "/api") {
    res.end("API response OK");
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
}

http.createServer(gateway).listen(3001);