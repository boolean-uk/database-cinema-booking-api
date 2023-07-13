const { Prisma } = require("@prisma/client")
const prisma = require('../utils/prisma')

const updateCustomer = async (req, res) => {
    const { id } = req.params;
    const { name, contact } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Missing fields in request body' });
    }

    try {
        const updatedCustomer = await prisma.customer.update({
            where: { id: parseInt(id) },
            data: {
                name,
                contact: {
                    update: contact,
                },
            },
            include: {
                contact: true,
            },
        });

        res.status(201).json({ customer: updatedCustomer });
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') {
            return res.status(404).json({ error: 'Customer with that id does not exist' });
        }
        res.status(500).json({ error: e.message });
    }
};

module.exports = {
    updateCustomer,
};
