const prisma = require("../utils/prisma");

async function getMoviesDb() {
  const movies = await prisma.movie.findMany({
    include: {
        screenings: true
    }
  });
  return movies;
}

module.exports = {
  getMoviesDb
};
