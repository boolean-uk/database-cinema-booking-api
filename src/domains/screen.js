const prismaClient = require("../utils/prisma.js");

const addScreenToDatabase = async (number) =>
  await prismaClient.screen.create({
    data: {
      number,
    },
  });

module.exports = { addScreenToDatabase };
