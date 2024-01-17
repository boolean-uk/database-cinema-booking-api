const prisma = require("../utils/prisma");

const createTicketDb = async (screeningId, customerId) =>
  await prisma.ticket.create({
    data: {
      screeningId: screeningId,
      customerId: customerId,
    },
    include: {
      customer: { include: { contact: true } },
      screening: {
        include: {
          screen: true,
          movie: true,
        },
      },
    },
  });

module.exports = {
  createTicketDb,
};
