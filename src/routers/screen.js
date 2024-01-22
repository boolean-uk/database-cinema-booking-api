const express = require("express");
const router = express.Router();

const { createScreen } = require("../controllers/screen");
router.posts("/", createScreen);

module.exports = router;
