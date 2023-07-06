const prisma = require("../utils/prisma");

async function getMoviesList() {
  const foundMovies = await prisma.movie.findMany({
    include: {
      screenings: true,
    },
  });
  return { movie: foundMovies };
}

module.exports = {
  getMoviesList,
};
