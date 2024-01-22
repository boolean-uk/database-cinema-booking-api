const prisma = require("../utils/prisma");

const getAllMoviesDb = async () => {
  return await prisma.movie.findMany();
};
module.exports = { getAllMoviesDb };
