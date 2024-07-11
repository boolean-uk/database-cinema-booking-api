const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const {
    createCustomer,
    updateCustomer
} = require('../controllers/customer')

const router = express.Router();

router.post('/register', createCustomer)

// Update customer endpoint
router.put('/:id', updateCustomer);

module.exports = router;
