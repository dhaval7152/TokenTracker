require("dotenv").config();
const express = require("express");

const app = express();
const port = process.env.port || 2000;

const mainRoute = require("../Routes/MainRoute");

const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes imported
app.use(mainRoute);

app.get("/getToken/:account", async (req, res) => {
  let account = req.params.account;
  const response = await fetch(
    `http://api-sepolia.etherscan.io/api?module=account&action=tokentx&address=${account}&startblock=0&endblock=9999999999&sort=desc&apikey=KVEJ36AFAW9JDERQDEVITWDKQJF59M2TTP`,
    {
      method: "GET",
    }
  );
  /* eslint-disable */
  const json = await response.json();
  const result = json.result;
  let resp;
  for (let i = 0; i < result.length; i++) {
    if (json.result[i].from != account) {
      resp = json.result[i];
      break;
    }
  }
  res.send(resp);
});

app.listen(port, () => {
  console.log(`Server is Running On http://localhost:${port}`);
});
