const express = require("express")
const { createScreen, getAllScreens } = require("../controllers/screens")
const router = express.Router()
router.get("/", getAllScreens)
router.post("/", createScreen)
module.exports = router