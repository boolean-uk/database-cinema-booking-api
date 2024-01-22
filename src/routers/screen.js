const express = require("express");
const router = express.Router();

const { createScreen } = require("../controllers/screen");
router.post("/screens", createScreen);

module.exports = router;
