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

module.exports = {
  fetchMoviesDB,
  generateMovieDB,
};
