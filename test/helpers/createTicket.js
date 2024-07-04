const prisma = require("../../src/utils/prisma")

const createTicket = async (screeningId, customerId) => await prisma.ticket.create({
    where: {
        screeningId: screeningId,
        customerId: customerId
    },
    include: {
        screening: true,
        customer: true,
        movie,
        screen
    }
})

module.exports = {
    createTicket
}