const prisma = require("../utils/prisma");

const getMoviesDb = async () =>
  await prisma.movie.findMany({
    include: {
      screenings: true,
    },
  });

const createMovieDb = async (title, runtimeMins, screenings = [] ) =>
  await prisma.movie.create({
    data: {
      title,
      runtimeMins,
      screenings: {
        createMany: {
          data: screenings,
        },
      },
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

module.exports = { getMoviesDb,createMovieDb, getMovieByIdDb };
