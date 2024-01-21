const prisma = require("../utils/prisma");

const generateTicketDb = async (screeningId, customerId) =>
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
  generateTicketDb,
};
