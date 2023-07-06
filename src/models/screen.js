// const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const createScreenData = async (number) => {
  const new_screen = await prisma.screen.create({
    data: {
      number,
    },
  });

  // const movie_with_screen = getMovieDataById(new_screen.id);
  return new_screen;
};

module.exports = {
  createScreenData,
};
