const prisma = require("../utils/prisma");

const createTheScreenDB = async (number) => {
  try {
    return await prisma.screen.create({
      data: {
        number,
      },
    });
  } catch (error) {
    throw error;
  }
};

module.exports = { createTheScreenDB };
