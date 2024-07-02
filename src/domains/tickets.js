const prisma = require('../utils/prisma')

const createTicketDb = async (screeningId, customerId) => {
    await prisma.screening.findUniqueOrThrow({
        where: { id: screeningId },
        include: {
            movie: true,
            screen: true,
        },
    })

    await prisma.customer.findUniqueOrThrow({
        where: { id: customerId },
        include: {
            contact: true,
        },
    })

    return await prisma.ticket.create({
        data: {
            screeningId: screeningId,
            customerId: customerId,
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
    })
}

module.exports = { createTicketDb }
