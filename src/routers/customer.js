const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = express.Router();

// Update customer endpoint
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, contact } = req.body;

    if (!name && !contact) {
        return res.status(400).json({ error: 'Request body must contain name or contact' });
    }

    try {
        // Check if customer exists
        const existingCustomer = await prisma.customer.findUnique({ where: { id: parseInt(id) } });

        if (!existingCustomer) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        // Update customer data
        const updatedCustomer = await prisma.customer.update({
            where: { id: parseInt(id) },
            data: {
                name,
                contact: contact ? {
                    update: contact
                } : undefined,
            },
            include: { contact: true }
        });

        return res.status(201).json({ customer: updatedCustomer });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
