const express = require("express");
const { createScreen } = require("../controllers/screenController");

const router = express.Router();

router.post("/", createScreen);

module.exports = router;
