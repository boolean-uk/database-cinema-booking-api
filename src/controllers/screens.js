const { Prisma } = require("@prisma/client");

const prisma = require("../utils/prisma");

const createScreen = async (req, res) => {
  const screenNumber = req.body.number;
  if (!screenNumber) {
    return res.status(400).json({ error: "Missing or invalid input field" });
  }
  const screenings = req.body.screenings;
  try {
    if (!screenings) {
      const newScreen = await prisma.screen.create({
        data: {
          number: screenNumber,
        },
      });
      res.status(201).json({ screen: newScreen });
    } else {
      const newScreen = await prisma.screen.create({
        data: {
          number: screenNumber,
        },
      });

      const updatedScreen = await prisma.screen.update({
        where: {
          id: newScreen.id,
        },
        data: {
          screenings: {
            create: screenings,
          },
        },
        include: {
          screenings: true,
        },
      });
      res.status(201).json({ screen: updatedScreen });
    }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(409).json({
          error: `A Screen with number: ${req.body.number} already exists.`,
        });
      }
    }
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  createScreen,
};
