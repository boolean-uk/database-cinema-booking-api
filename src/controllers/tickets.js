const { Prisma } = require("@prisma/client");
const { contact } = require("../utils/prisma");
const prisma = require("../utils/prisma");

const createTicket = async (req, res) => {
  const { screeningId, customerId } = req.body;

  const ticket = await prisma.ticket.create({
    data: {
      screeningId,
      customerId,
    },
    include: {
      screening: {
        select: {
          id: true,
          movieId: true,
          screenId: true,
          startsAt: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      customer: {
        include: {
          contact: true,
        },
      },
  
    },
  });

  res.status(201).json({ ticket: ticket });
};

module.exports = { createTicket };
