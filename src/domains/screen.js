const prisma = require("../utils/prisma");

const createScreenDb = async (data) =>
  await prisma.screen.create({
    data: {
      number: data.number,
    },
  });

module.exports = {
  createScreenDb,
};
