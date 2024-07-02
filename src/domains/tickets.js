const prisma = require("../utils/prisma");

async function createTicketDb(screeningId, customerId) {

  const request = {
    data: {
      screeningId: Number(screeningId),
      customerId: Number(customerId),
    },
    include: {
      screening: {
        include: {
          screen: true,
          movie: true,
        },
      },
      customer: {
        include: {
          contact: true,
        },
      },
    },
  };

  let ticket;
  try {
    ticket = await prisma.ticket.create(request);
  } catch (e) {
    throw Error('P2003')
  }

  return ticket;
}

module.exports = { createTicketDb };
