const express = require('express');

const router = express.Router();

const controller = require('../controllers/customers');

router.post('/register', controller.createCustomer);

router.put('/:id', controller.updateCustomer);

module.exports = router;
