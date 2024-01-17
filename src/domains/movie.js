const prisma = require("../utils/prisma");

const fetchMoviesDB = async () => {
  const theMovies = await prisma.movie.findMany({
    include: {
      screenings: true,
    },
  });
  return theMovies;
};
const generateMovieDB = async (title, runtimeMins) =>
  await prisma.movie.create({
    data: {
      title,
      runtimeMins,
    },
    include: {
      screenings: true,
    },
  });
const fetchMovieByIdDB = async (id) =>
  await prisma.movie.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      screenings: true,
    },
  });

const updateTheMovieDB = async (id, title, runtimeMins) =>
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
  fetchMoviesDB,
  generateMovieDB,
  fetchMovieByIdDB,
  updateTheMovieDB,
};
