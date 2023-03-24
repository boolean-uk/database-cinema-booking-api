const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const createTicket = async (req, res) => {
  const { screeningId, customerId } = req.body;
  const screening = await prisma.screening.findFirst({
    where: {
      id: screeningId,
    },
  });

  const customer = await prisma.customer.findFirst({
    where: {
      id: customerId,
    },
  });

  if (!screeningId || !customerId) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }

  if (customer && screening) {
    const createdTicket = await prisma.ticket.create({
      data: {
        screening: {
          connect: {
            id: screeningId,
          },
        },
        customer: {
          connect: {
            id: customerId,
          },
        },
      },
      include: {
        customer: true,
        screening: true,
      },
    });
    return res.status(201).json({ ticket: createdTicket });
  } else {
    res.status(404).json({
      error: "A customer or screening does not exist with the provided id.",
    });
  }
};

module.exports = {
  createTicket,
};
