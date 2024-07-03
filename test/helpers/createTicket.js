const prisma = require("../../src/utils/prisma");

async function createTicket(screening, customer) {
  const ticketData = {
    screeningId: screening.id,
    customerId: customer.id,
    include: {
      screening: true,
      customer: true,
      screen: true,
      movie: true,
    },
  };

  const ticket = await prisma.tickets.create({
    data: ticketData,
  });
}

module.exports = {
  createTicket,
};
