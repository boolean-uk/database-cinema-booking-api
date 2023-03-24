const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const createScreen = async (req, res) => {
  const { number, screenings } = req.body;

  if (!number) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }

  try {
    if (number) {
      const createdScreen = await prisma.screen.create({
        data: {
          number,
          screenings,
        },
        include: {
          screenings: true,
        },
      });

      return res.status(201).json({ screen: createdScreen });
    }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res
          .status(409)
          .json({ error: "A screen with the provided number already exists" });
      }
    }
    res.status(500).json({ error: e.message });
  }
};

// const updatedScreen = await prisma.screen.update({
//   where: {
//     id: newScreen.id,
//   },
//   data: {
//     screenings: {
//       create: screenings,
//     },
//   },
//   include: {
//     screenings: true,
//   },
// });
// res.status(201).json({ screen: updatedScreen });

module.exports = {
  createScreen,
};
