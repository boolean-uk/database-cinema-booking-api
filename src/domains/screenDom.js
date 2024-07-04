const prisma = require("../utils/prisma");

const createScreenDb = async (data) => {
  const result = await prisma.screen.create({
    data,
    include: {
      screenings: true,
    },
  });
  return result;
};

module.exports = {
  createScreenDb,
};
