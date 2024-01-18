const prisma = require("../utils/prisma");

const updateScreenDb = async (id, number, screenings = []) => {
    return await prisma.screen.update({
      where: {
        id,
      },
      data: {
        number,
        screenings: {
          ...(screenings.length > 0 && {
            createMany: {
              data: screenings,
            },
          }),
        },
      },
    });
  };
  
  module.exports = {
    updateScreenDb,
  };