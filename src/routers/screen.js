const express = require("express");
const router = express.Router();

const  { createAScreen} = require('../controllers/screen.js');




router.post('/', createAScreen)



module.exports = router;