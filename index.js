var express = require("express");
var app = express();

const {
  getEtherPrice,
  verifyMessage,
  getTransaction,
  getTransactionReceipt
  
} = require('./metamaskService.js');

app.get("/message/verify", async(req, res, next) => {
  const result = await verifyMessage(req.query.message, req.query.address, req.query.signature);
  res.json(result);
});

app.get("/transaction/:txhash", async(req, res, next) => {
  if (!req.query.provider)
    providerCode = 1
  else
    providerCode = parseInt(req.query.provider);
  
  const result = await getTransaction(req.params.txhash, providerCode);
  res.json(result);
});

app.get("/transaction/:txhash/receipt", async(req, res, next) => {
  if (!req.query.provider)
    providerCode = 1
  else
    providerCode = parseInt(req.query.provider);

  const result = await getTransactionReceipt(req.params.txhash, providerCode);
  res.json(result);
});

app.get("/getEtherPrice", async(req, res, next) => {
  const result = await getEtherPrice();
  res.json(result);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
 console.log("Server running on port 3000");
});
