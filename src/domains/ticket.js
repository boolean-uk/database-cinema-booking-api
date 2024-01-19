const prisma = require("../utils/prisma");

const createTicketDB = async (screeningId, customerId) =>
    await prisma.ticket.create({
        data: {
            screening: {
                connect: {
                    id: screeningId,
                },
            },
            customer: {
                connect: {
                    id: customerId,
                },
            },
        },
        include: {
            screenings: true,
        },
    });

module.exports = {
    createTicketDB,
};
