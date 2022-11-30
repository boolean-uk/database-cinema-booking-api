const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const createScreen = async (req, res) => {
  const { number, screenings } = req.body;
  const { movieId, screenId, startsAt } = screenings;
  if (!number) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }
  const screenAlreadyExist = await prisma.screen.findFirst({
    where: {
      number: { equals: number },
    },
  });

  if (screenAlreadyExist) {
    return res.status(409).json({
      error: "A screen with the provided number already exist",
    });
  }
  const screen = await prisma.screen.create({
    data: {
      number: number,
      screenings: [movieId, screenId, startsAt],
    },
  });
  res.status(201).json({ screen: screen });
};

module.exports = { createScreen };
