const express = require("express");
const app = express();
const router = express.Router();

const mainController = require("../Controllers/MainController");


router.get("/hello",mainController.hello)

module.exports = router;


