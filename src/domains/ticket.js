const BadRequest = require("../errors/BadRequest")
const NotFound = require("../errors/NotFound")
const prisma = require("../utils/prisma")

const createTicketDb = async (screeningId, customerId) => {
  if (!screeningId || !customerId) {
    throw new BadRequest("Missing fields in request body")
  }

  const customer = await prisma.customer.findUnique({
    where: {
      id: customerId,
    },
  })

  const screening = await prisma.screening.findUnique({
    where: {
      id: screeningId,
    },
  })

  if (!customer || !screening) {
    throw new NotFound(
      "A customer or screening does not exist with the provided id"
    )
  }

  return await prisma.ticket.create({
    data: {
      screeningId: screeningId,
      customerId: customerId,
    },
    select: {
      id: true,
      customer: {
        include: {
          contact: true,
        },
      },
      screening: {
        include: {
          screen: true,
          movie: true,
        },
      },
    },
  })
}

module.exports = createTicketDb
