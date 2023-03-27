const { Prisma } = require("@prisma/client");

const prisma = require("../utils/prisma");

const createTicket = async (req, res) => {
  const { screeningId, customerId } = req.body;

  if (!screeningId || !customerId) {
    return res.status(400).json({ error: "Missing input field" });
  }
  // Bad solution
  //   try {
  //     const customer = await prisma.customer.findUniqueOrThrow({
  //       where: {
  //         id: customerId,
  //       },
  //     });
  //   } catch (e) {
  //     if (e instanceof Prisma.PrismaClientKnownRequestError) {
  //       if (e.code === "P2025") {
  //         return res.status(404).json({
  //           error: "A customer does not exist with provided id.",
  //         });
  //       }
  //     }
  //   }

  //   try {
  //     const screening = await prisma.screening.findUniqueOrThrow({
  //       where: {
  //         id: screeningId,
  //       },
  //     });
  //   } catch (e) {
  //     if (e instanceof Prisma.PrismaClientKnownRequestError) {
  //       if (e.code === "P2025") {
  //         return res.status(404).json({
  //           error: "A screening does not exist with provided id.",
  //         });
  //       }
  //     }
  //   }

  const data = {
    data: {
      screeningId: screeningId,
      customerId: customerId,
    },
    include: {
      screening: {
        include: {
          movie: true,
          screen: true,
        },
      },
      customer: true,
    },
  };

  try {
    const ticket = await prisma.ticket.create(data);
    res.status(201).json({ ticket });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2003") {
        return res.status(404).json({
          error: "A customer or screening does not exist with provided id",
        });
      }
      res.status(500).json({ error: e.message });
    }
  }
};

module.exports = {
  createTicket,
};
