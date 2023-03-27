const express = require("express");
const ticketsController = require("../controllers/tickets.js");

const router = express.Router();

router.post("/", ticketsController.createTicket);

module.exports = router;
