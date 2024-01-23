const prisma = require("../utils/prisma");

const getAllMoviesDb = async () => {
  return await prisma.movie.findMany();
};
const createMovieDb = async (title, runtimeMins) => {
  return await prisma.movie.create({
    data: {
      title,
      runtimeMins,
    },
  });
};
module.exports = { getAllMoviesDb, createMovieDb };
