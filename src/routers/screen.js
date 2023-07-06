const express = require("express");
const {
   createScreen, getAll
    
} = require('../controllers/screen');

const router = express.Router();

router.post("/", createScreen)
router.get("/", getAll)


module.exports = router;