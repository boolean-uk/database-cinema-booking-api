const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const createScreen = async (req, res) => {
  const { number } = req.body;
  const createScreen = await prisma.screen.create({
    data: {
      number,
    },
  });

  res.status(201).json({screen: createScreen})
};

module.exports = {
  createScreen,
};
