const prisma = require("../utils/prisma");

async function getMoviesDb() {
  const movies = await prisma.movie.findMany();
  return movies;
}

module.exports = {
  getMoviesDb
};
