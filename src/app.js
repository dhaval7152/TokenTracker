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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is Running On http://localhost:${port}`);
});
