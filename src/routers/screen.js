const express = require("express");
const router = express.Router();

const { createNewScreen } = require("../controllers/screen.js");

router.post("/", createNewScreen);

module.exports = router;
