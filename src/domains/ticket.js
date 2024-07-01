const prisma = require('../utils/prisma.js')

const createTicket = async (req) => await prisma.ticket.create({
    data: {
        screeningId: req.body.
    },
    include: {
        screening: true,
        customer: true
    }
})