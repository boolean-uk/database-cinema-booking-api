const prisma = require("../utils/prisma");

const createTicketDB = async (screeningId, customerId) =>
    await prisma.ticket.create({
        data: {
            screeningId,
            customerId,
        },
        include: {
            screening: {
                include: {
                    screen: true,
                    movie: true,
                },
            },
            customer: {
                include: {
                    contact: true,
                },
            },
        },
    });

module.exports = {
    createTicketDB,
};
