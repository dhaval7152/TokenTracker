require("dotenv").config();
const express = require("express");

const app = express();
const port = process.env.port || 2000;

const mainRoute = require("../Routes/MainRoute");

const cors = require("cors");
const { listenToTransactions } = require("./repository");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes imported
app.use(mainRoute);

app.get("/getToken/:account", async (req, res) => {
  let account = req.params.account;
  const result = await listenToTransactions(account);
  res.send(result);
});

app.listen(port, () => {
  console.log(`Server is Running On http://localhost:${port}`);
});
