const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const createTicket = async (req, res) => {
  const { screeningId, customerId } = Number(req.params.id);
  const screening = await prisma.screening.findFirst({
    where: {
      screeningId: screeningId,
    },
  });
  const customer = await prisma.customer.findFirst({
    where: { customerId: customerId },
  });
  try {
    const createdticket = await prisma.ticket.create({
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

    res.status(201).json({ ticket: createdticket });
  } catch (e) {}
};

module.exports = { createTicket };
