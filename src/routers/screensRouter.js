const express = require('express')
const router = express.Router()

// Controllers
const { createScreen } = require('../controllers/screens')

// Create a screen
router.post('/', createScreen)

module.exports = router
