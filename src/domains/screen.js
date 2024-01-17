const prisma = require("../utils/prisma.js");

const createScreenDB = async (number) =>
  await prisma.screen.create({
    data: { number: number },
  });

module.exports = {
  createScreenDB,
};
