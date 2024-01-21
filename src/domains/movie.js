const prisma = require("../utils/prisma.js");

const getMovieListDb = async () =>
  await prisma.movie.findMany();

module.exports = { getMovieListDb };
