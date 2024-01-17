const express = require('express')
const router = express.Router()

const { createTicket } = require('../controllers/ticket.js')

// CREATE A SCREEN
router.post('/', createTicket)

module.exports = router