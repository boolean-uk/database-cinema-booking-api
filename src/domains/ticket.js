const prisma = require('../utils/prisma.js')

const createTicket = async (req) => await prisma.ticket.create({
    data: {
        screeningId: req.body.screeningId,
        customerId: req.body.customerId
    },
    include: {
        screening: true,
        customer: true
    }
})

module.exports = {
    createTicket
}