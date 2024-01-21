const prisma = require("../utils/prisma");

const locateShowingByIdDb = async (identifier) =>
  await prisma.screening.findUnique({
    where: {
      id: identifier,
    },
  });

module.exports = {
  locateShowingByIdDb,
};
