const prisma = require("../utils/prisma");

const getMoviesDb = async () => await prisma.movie.findMany();

module.exports = {
  getMoviesDb,
};
