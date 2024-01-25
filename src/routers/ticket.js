const express = require("express");
const router = express.Router();

const { createTicket } = require("../controllers/ticket.js");

router.post("/", createTicket);

module.exports = router;