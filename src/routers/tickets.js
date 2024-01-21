const express = require (express)
const router = express.Router()
const{createTicket} = require ('../controllers/tickets.js')

// creating a ticket

router.post('/', createTicket)

module.exports = router