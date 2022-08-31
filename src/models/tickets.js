const { Prisma } = require('@prisma/client');
const prisma = require('../utils/prisma');

const { SUCCESS, FAILED } = require('../utils/vars');

const createTicket = async (screeningId, customerId) => {
  try {
    const ticket = await prisma.ticket.create({
      data: {
        customerId,
        screeningId,
      },
      include: {
        screening: {
          include: { movie: true, screen: true },
        },
        customer: {
          include: {
            contact: true,
          },
        },
      },
    });

    return [SUCCESS, ticket];
  } catch (err) {
    console.error('[DB ERROR]', err);
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      return [FAILED, err.code];
    }
  }
};

module.exports = { createTicket };
