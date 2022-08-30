const express = require('express');

const router = express.Router();

const controller = require('../controllers/screens');

router.post('/', controller.createScreen);

module.exports = router;
