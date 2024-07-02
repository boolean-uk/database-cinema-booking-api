const express = require('express')
const { createTicketController } = require('../controllers/ticket')
const router = express.Router()

router.post('/', createTicketController)

module.exports = router