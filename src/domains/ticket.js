const prisma = require('../utils/prisma')

async function createTicketDb(screeningId, customerId) {
    const ticketData = {
        data: {
        screeningId: screeningId,
        customerId: customerId
        }, include: {
            screening: true,
            customer: true,
            customer: {
                include: {
                    contact: true
                }
            },
            screening: {
                include: {
                    screen: true,
                    movie: true
                }
            }
        }
    }

    return await prisma.ticket.create(ticketData)
}
  
module.exports = {
    createTicketDb
}