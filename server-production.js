const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const host = process.env.HOST || "0.0.0.0";
const path = require("path");
const compression = require("compression");
const http = require("http");
const errorHandler = require('express-error-handler');
const debug = require('debug');

app.use(compression());

app.get("*", (req, res) => {
  debug('http')(req.path)
  res.sendFile(path.join(__dirname, "public", req.path));
})

server = http.createServer(app);

app.use(errorHandler({server}));

app.listen(port, host, () => {
  debug('http')(`Server started at http://${host}:${port}`);
});
