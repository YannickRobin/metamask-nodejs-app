var express = require("express");
var app = express();

const {
  sayHello,
  verifyMessage
} = require('./metamaskService.js');

app.get("/hello", async(req, res, next) => {
    const hello = await sayHello();
    res.json(hello);
});

app.get("/message/verify", async(req, res, next) => {
  const result = await verifyMessage(req.query.message, req.query.address, req.query.signature);
  res.json(result);
});

app.listen(3000, () => {
 console.log("Server running on port 3000");
});
