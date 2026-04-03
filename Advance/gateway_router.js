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

http.createServer(gateway).listen(3002, () => {
  console.log("Gateway on 3002");
});