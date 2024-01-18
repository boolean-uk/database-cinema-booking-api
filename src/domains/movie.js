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

const updateMovieDb = async (id, title, runtimeMins, screenings = []) =>{
  return await prisma.movie.update({
    where: {
      id,
    },
    data: {
      title,
      runtimeMins,
      screenings: {
        ...(screenings.length > 0 && {
          createMany: {
            data: screenings,
          },
        })
      },
    },
  });
}

module.exports = { getMoviesDb,createMovieDb, getMovieByIdDb,updateMovieDb };
