const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const createScreen = async (req, res) => {
  const { number } = req.body;

  if (!number) {
    return res.status(400).json({
      error: "Missing fields in the request body",
    });
  }

  const foundScreen = await prisma.screen.findFirst({
    where: {
      number: number,
    },
  });
  if (foundScreen)
    res.status(409).json({
      error: "A screen with provided number already exists",
    });

  try {
    const createdScreen = await prisma.screen.create({
      data: {
        number,
      },
    });
    res.status(201).json({ screen: createdScreen });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createScreen,
};
