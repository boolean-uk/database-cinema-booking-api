const express = require("express")
const { addScreen } = require("../controllers/screen")
const router = express.Router()

router.post('/', addScreen)

module.exports = router