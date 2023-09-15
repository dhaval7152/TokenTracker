const express = require("express");
const requestIp = require("request-ip");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/ip", (req, res) => {
  const clientIp = requestIp.getClientIp(req);
  console.log(clientIp);
  res.send({ ip: clientIp });
});
app.get("/err", (req, res) => {
  throw new Error("BROKEN");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
///
