const { Prisma } = require("@prisma/client");
const { screening } = require("../utils/prisma");
const prisma = require("../utils/prisma");
const createScreen = async (req, res) => {
  const { number, screenings } = req.body;
  if (!number) {
    return res.status(400).json({
      error: "A number is needed in the request body",
    });
  }

  {
    const createdScreen = await prisma.screen.create({
      data: {
        number,
        screenings: { create: screenings },
      },
      include: {
        screenings: true,
      },
    });
    res.status(201).json({ screen: createdScreen });
  }
};

module.exports = {
  createScreen,
};
