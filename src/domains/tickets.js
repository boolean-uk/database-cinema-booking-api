const prisma = require("../utils/prisma");

async function createTicketDb(ticketData) {
  const { screeningId, customerId } = ticketData;

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
    console.log(e);
  }

  return ticket;
}

module.exports = { createTicketDb };
