const prisma = require("../../src/utils/prisma");

const createTicket = async (screeningId, customerId) => {
  return await prisma.ticket.create({
    data: {
      screeningId: screeningId,
      customerId: customerId,
    },
    include: { screening: true, customer: { include: { contact: true } }, screening: {  include: {
        movie: true,
        screen: true,
      }} },
  });
};

module.exports = {
  createTicket,
};
