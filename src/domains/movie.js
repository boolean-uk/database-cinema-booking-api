const prisma = require("../utils/prisma.js");

const getMoviesDB = async (minRuntime, maxRuntime) => {
  const movies = await prisma.movie.findMany({
    where: {
      runtimeMins: {
        gt: minRuntime && Number(minRuntime),
        lt: maxRuntime && Number(maxRuntime),
      },
    },
    include: {
      screenings: true,
    },
  });

  return movies;
};

const createMovieDB = async (title, runtimeMins) =>
  await prisma.movie.create({
    data: {
      title,
      runtimeMins,
    },
    include: {
      screenings: true,
    },
  });

const getMovieByIdDB = async (id) =>
  await prisma.movie.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      screenings: true,
    },
  });

const updateMovieDB = async (id, title, runtimeMins) =>
  await prisma.movie.update({
    where: {
      id: Number(id),
    },
    data: { title: title, runtimeMins: runtimeMins },
    include: {
      screenings: true,
    },
  });

module.exports = {
  getMoviesDB,
  createMovieDB,
  getMovieByIdDB,
  updateMovieDB,
};
