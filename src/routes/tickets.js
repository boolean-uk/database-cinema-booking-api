const express = require('express');

const router = express.Router();

const controller = require('../controllers/tickets');

router.post('/', controller.createTicket);

module.exports = router;
