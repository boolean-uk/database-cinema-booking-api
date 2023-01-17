const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const getMovies = async (req, res) => {
  const getAllMovies = await prisma.movie.findMany();
  res.status(200).json({ movies: getAllMovies });
};

module.exports = {
  getMovies,
};
