const express = require("express");
const screensContoller = require("../controllers/screens");

const router = express.Router();

router.post("/", screensContoller.createScreen);

module.exports = router;
