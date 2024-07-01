const prisma = require('../utils/prisma')
const { PrismaClientKnownRequestError } = require('@prisma/client')

const createTicketDb = async (screeningId, customerId) => {
    const screening = await prisma.screening.findUnique({
        where: { id: screeningId },
        include: {
            movie: true,
            screen: true,
        },
    })

    if (!screening) {
        throw Error('P2015')
    }

    const customer = await prisma.customer.findUnique({
        where: { id: customerId },
        include: {
            contact: true,
        },
    })

    if (!customer) {
        throw Error('P2015')
    }

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
