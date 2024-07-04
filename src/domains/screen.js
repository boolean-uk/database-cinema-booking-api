const prisma = require("../utils/prisma");

const create = async (number) =>
  await prisma.screen.create({
    data: {
      number,
    },
  });

module.exports = {
    create,
};
