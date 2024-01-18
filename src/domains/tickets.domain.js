const prisma = require("../utils/prisma");
const Types = require("../utils/types.d");

/**
 * @param {Number} screeningId
 * @param {Number} customerId
 * @returns {Promise<Types.Ticket & {screening: Types.Screening & {movie: Types.Movie, screen: Types.Screen}} & {customer: Types.Customer & {contact: Types.Contact | null}}>}
 */
async function createTicket(screeningId, customerId) {
  return await prisma.ticket.create({
    data: {
      screeningId,
      customerId,
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
  });
}

module.exports = {
  createTicket,
};
