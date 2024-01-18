const express = require("express");
const { postTicket } = require("../controllers/tickets.controller.js");
const { validateBody } = require("../middleware/zod/validate.js");
const { newTicketSchema } = require("../middleware/zod/ticket.zod.js");

const router = express.Router();

router.post("/", validateBody(newTicketSchema), postTicket);

module.exports = router;
