const prisma = require('../utils/prisma')

// CREATE A TICKET
const createTicketDb = async (screeningId, customerId) => await prisma.ticket.create({
    data: {
        screeningId,
        customerId
     },
     include: {
        screening: {
            include: {
                movie: true,
                screen: true
            }
        },
        customer: {
            include:
            {contact: true}
        }
     }
})

const checkScreeningIdDb = async (screeningId) => await prisma.screening.findFirst({
    where: { id: screeningId }
})

const checkCustomerIdDb = async (customerId) => await prisma.customer.findFirst({
    where: { id: customerId }
})

module.exports = { createTicketDb, checkScreeningIdDb, checkCustomerIdDb }