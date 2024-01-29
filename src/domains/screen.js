const { prisma } = require("../utils/prisma");

const createScreenDb = async (number) => {
  try {
    const newScreen = await prisma.screen.create({
      data: {
        number: Number(number),
      },
      include: {
        screenings: true,
      },
    });

    return newScreen;
  } catch (error) {
    throw error; 
  }
};

module.exports = {
  createScreenDb,
};
