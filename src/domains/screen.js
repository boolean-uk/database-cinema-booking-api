const { prisma } = require("../utils/prisma");

const createScreenDb = async (number) => {
  const newScreen = await prisma.screen.create({
    data: {
      number: Number(number),
    },
    include: {
      screenings: true,
    },
  });
  return newScreen;
};

module.exports = {
  createScreenDb,
};
