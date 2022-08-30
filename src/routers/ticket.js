const express = require('express');
const {
    getAllTicket,
    createTicket,
    getTicketById
} = require("../controllers/ticket");

const router = express.Router();

router.get("",getAllTicket);
router.get("/:id",getTicketById);
router.post("",createTicket);

module.exports = router;
