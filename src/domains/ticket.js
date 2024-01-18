const { ticket } = require('../utils/prisma')

const createTicketDb = async (screeningId, customerId) => {
  const createdTicket = await ticket.create({
    data: {
      screeningId: screeningId,
      customerId: customerId
    },
    include: {
      screening: {
        include: {
          movie: true,
          screen: true
        }
      },
      customer: {
        include: {
          contact: true
        }
      }
    }
  })

  const { screen, movie, ...screening } = createdTicket.screening

  const result = {
    id: createdTicket.id,
    screening: screening,
    customer: createdTicket.customer,
    screen: screen,
    movie: movie
  }

  return result
}

module.exports = {
  createTicketDb
}
