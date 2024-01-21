const express = require("express");
const { generateTicket } = require("../controllers/tickets");
const router = express.Router();
router.post("/", generateTicket);
module.exports = router;
