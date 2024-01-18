const express = require('express')
const router = express.Router()

// controllers
const { createTicket } = require('../controllers/ticket')

// Create a ticket
router.post('/', createTicket)

module.exports = router
