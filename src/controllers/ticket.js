const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const createTicket = async (req, res) => {
  const { screeningId, customerId } = req.body;

  if (!screeningId || !customerId) {
    return res.status(400).json({
      error: "Missing fields in the request body",
    });
  }
  console.log(screeningId, customerId);
  const customer = await prisma.customer.findFirst({
    where: {
      id: Number(customerId),
    },
  });
  const screening = await prisma.screening.findFirst({
    where: {
      id: Number(screeningId),
    },
  });
  console.log(screening, customer);
  try {
    const createdTicket = await prisma.ticket.create({
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
    res.status(201).json({ screen: createdTicket });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
module.exports = {
  createTicket,
};
