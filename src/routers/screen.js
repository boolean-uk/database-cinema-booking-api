const express = require("express");
const {
    createNewScreen
} = require('../controllers/screen');

const router = express.Router();


router.post("/", createNewScreen)


module.exports = router