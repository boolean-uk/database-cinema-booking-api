const express = require("express");
const {
    createTicket, getAll
    
} = require('../controllers/ticket');

const router = express.Router();

router.post("/", createTicket)
router.get("/", getAll)


module.exports = router;