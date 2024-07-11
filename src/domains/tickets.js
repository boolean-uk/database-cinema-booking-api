const prisma = require('../utils/prisma');

/**
 * Creates a new ticket for a screening by a customer.
 * @param {number} screeningId - ID of the screening for which the ticket is being created.
 * @param {number} customerId - ID of the customer who is purchasing the ticket.
 * @returns {Promise<object>} Created ticket object with included screening, movie, customer, and customer contact details.
 */
const createTicketDb = async (screeningId, customerId) => {
    try {
        const screening = await prisma.screening.findUniqueOrThrow({
            where: { id: screeningId },
            include: {
                movie: true,
                screen: true,
            },
        });

        const customer = await prisma.customer.findUniqueOrThrow({
            where: { id: customerId },
            include: {
                contact: true,
            },
        });

        const ticket = await prisma.ticket.create({
            data: {
                screeningId,
                customerId,
            },
            include: {
                screening: {
                    include: {
                        movie: true,
                        screen: true,
                    },
                },
                customer: {
                    include: {
                        contact: true,
                    },
                },
            },
        });

        return ticket;
    } catch (error) {
        throw new Error(`Failed to create ticket: ${error.message}`);
    }
};

module.exports = { createTicketDb };
