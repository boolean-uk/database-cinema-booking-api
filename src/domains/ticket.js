const prisma = require('../utils/prisma')

// CREATE A TICKET
const createTicketDb = async (number) => await prisma.screen.create({
    data: { number }
})


module.exports = { createTicketDb }