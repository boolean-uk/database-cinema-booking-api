const prisma = require("../utils/prisma.js");

const getMoviesDB = async () => {
  const movies = await prisma.movie.findMany({
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

module.exports = {
  getMoviesDB,
  createMovieDB,
  getMovieByIdDB,
};
