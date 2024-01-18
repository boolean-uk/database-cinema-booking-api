const express = require('express');
const { updateScreen } = require('../controllers/screenController');
const router = express.Router();

router.put('/update/:id', updateScreen);

module.exports = router;
