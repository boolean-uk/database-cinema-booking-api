const prisma = require("../utils/prisma.js");

const createScreenDb = async (number) =>
  await prisma.screen.create({
    data: {
      number,
    },
  });
module.exports = { createScreenDb };
