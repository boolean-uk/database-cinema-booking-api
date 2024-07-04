const express = require("express")

const { createTicket, getAllTickets } = require('../controllers/ticket')

const router = express.Router()

router.get('/', getAllTickets)

router.post('/', createTicket)

module.exports = router