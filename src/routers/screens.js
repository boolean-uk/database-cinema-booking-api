const express = require("express");
const {
    createScreen
} = require('../controllers/screens');
const router = express.Router();

router.post("/register", createScreen);

module.exports = router;
