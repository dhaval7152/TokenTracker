const express = require("express");
const app = express();
const router = express.Router();

const mainController = require("../Controllers");

router.get("/hello", mainController.hello);
router.get("/getToken/:account", mainController.getTransaction);

module.exports = router;
