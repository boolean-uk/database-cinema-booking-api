const prisma = require("../utils/prisma");

const fetchMoviesDB = async () => {
  const theMovies = await prisma.movie.findMany({
    include: {
      screenings: true,
    },
  });
  return theMovies;
};

module.exports = {
  fetchMoviesDB,
};
