const express = require("express");
const router = express.Router();

const mainController = require("../Controllers");

router.get("/hello", mainController.hello);
router.get("/getToken/:account", mainController.getTransaction);
router.get("/cancell/listener", mainController.stopListening);
module.exports = router;
