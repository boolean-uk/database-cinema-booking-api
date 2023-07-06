const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const getAll = async (req, res) => {
  const getAll = await prisma.screen.findMany();
  res.json({ screens: getAll });
};

const createScreen = async (req, res) => {
  const { number, screenings } = req.body;

  if (!number) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }

  const existingScreen = await prisma.screen.findFirst({
    where: { number: Number(number) },
  });

  if (existingScreen) {
    return res.status(409).json({
      error: "A screen with the provided number already exists",
    });
  }

  const createdScreen = await prisma.screen.create({
    data: {
      number: Number(number),
      screenings: {
        create: screenings,
      },
    },
    include: {
      screenings: true,
    },
  });

  res.status(201).json({ screen: createdScreen });
};

module.exports = {
  createScreen,
  getAll,
};
