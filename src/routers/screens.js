const express = require("express");
const router = express.Router();
const { createAnotherScreen } = require("../controllers/screens");

router.post("/", createAnotherScreen );

module.exports = router;