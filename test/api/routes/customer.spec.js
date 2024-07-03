const express = require('express');
const router = express.Router();
const { createCustomer, updateCustomer } = require('../../helpers/createCustomer');
const prisma = require('../../src/utils/prisma');

router.post('/register', async (req, res) => {
    try {
        const { name, phone, email } = req.body;

        if (!name || !phone || !email) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const existingCustomer = await prisma.customer.findUnique({
            where: { email }
        });

        if (existingCustomer) {
            return res.status(409).json({ error: 'Email already in use' });
        }

        const customer = await createCustomer(name, phone, email);
        res.status(201).json({ customer });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, phone, email } = req.body;

        const customer = await updateCustomer(parseInt(id), name, phone, email);
        res.status(201).json({ customer });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;