const prisma = require("../utils/prisma");

const getMoviesDb = async () =>
  await prisma.movie.findMany({
    include: {
      screenings: true,
    },
  });

const getMovieByIdDb = async (id) =>
  await prisma.movie.findUnique({
    where: {
      id,
    },
    include: {
      screenings: true,
    },
  });

module.exports = { getMoviesDb, getMovieByIdDb };
