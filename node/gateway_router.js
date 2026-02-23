function gateway(req, res) {
  if (req.url.startsWith("/users")) {
    proxyRequest(4001, req, res);
  } 
  else if (req.url.startsWith("/orders")) {
    proxyRequest(4002, req, res);
  } 
  else {
    res.statusCode = 404;
    res.end("Service not found");
  }
}