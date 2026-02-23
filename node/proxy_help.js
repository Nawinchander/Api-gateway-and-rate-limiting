const http = require("http");

function proxyRequest(targetPort, req, res) {
  const options = {
    hostname: "localhost",
    port: targetPort,
    path: req.url,
    method: req.method,
    headers: req.headers
  };

  const proxy = http.request(options, proxyRes => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res);
  });

  req.pipe(proxy);
}