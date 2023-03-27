const { Prisma } = require('@prisma/client');
const prisma = require('../utils/prisma');

const createTicket = async (req, res) => {
    const { screeningId, customerId } = req.body;

    if (!customerId || !screeningId) {
        return res.status(400).json({
            error: 'Missing fields in request body',
        });
    }

    try {
        const ticket = await prisma.ticket.create({
            data: {
                screeningId,
                customerId,
            },
            include: {
                customer: true,
                screening: true,
            },
        });

        res.status(201).json({ ticket });
    } catch (e) {
        if (e.code === 'P2003') {
            return res.status(404).json({
                error: 'Screening or Customer with that ID not found',
            });
        }
        res.status(500).json({ error: e.message });
    }
};

module.exports = {
    createTicket,
};
