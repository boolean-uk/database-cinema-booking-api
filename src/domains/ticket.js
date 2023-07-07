const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const createTicket = async (screeningId, customerId) => {
  const request = {
    data: {
      screeningId,
      customerId
    }
  }

  const ticket = await prisma.ticket.create(request)
  return ticket
}

module.exports = {
  createTicket
}
