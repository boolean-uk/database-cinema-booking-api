const express = require("express");
const router = express.Router();
const { createTicket } = require('../controllers/tickets')

router.post('/', createTicket)


module.exports = router;