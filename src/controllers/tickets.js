const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const createTicket = async (req, res) => {
  const { screeningId, customerId } = req.body;
  const screening = await prisma.screening.findFirst({
    where: {
      id: Number(screeningId),
    },
  });
  const customer = await prisma.customer.findFirst({
    where: {
      id: Number(customerId),
    },
  });
  try {
    const ticket = await prisma.ticket.create({
      data: {
        screening: {
          connect: {
            id: screening.id,
          },
        },
        customer: {
          connect: {
            id: customer.id,
          },
        },
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        customer: true,
        screening: {
          include: {
            movie: true,
            screen: true,
          },
        },
      },
    });
    res.json({ ticket });
  } catch (error) {}
};

module.exports = { createTicket };
