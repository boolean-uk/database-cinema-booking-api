const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const createScreen = async (req, res) => {
  const { number } = req.body;

  if (!number) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }

  const numberExists = await prisma.screen.findFirst({
    where: {
      number: number,
    },
  });

  if (numberExists) {
    return res
      .status(409)
      .json({ error: "A screen with the provided number already exists" });
  }

  const createdScreen = await prisma.screen.create({
    data: {
      number,
    },
    include: {
      screenings: true
    }
  });

  res.status(201).json({ screen: createdScreen });

};

module.exports = {
  createScreen,
};
