const prisma = require("../utils/prisma.js");

const getMoviesDB = async () => {
  const movies = await prisma.movie.findMany({
    include: {
      screenings: true,
    },
  });

  return movies;
};

module.exports = {
  getMoviesDB,
};
