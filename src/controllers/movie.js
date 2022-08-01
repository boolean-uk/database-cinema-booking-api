const prisma = require("../utils/prisma");

const getAllMovies = async (_req, res) => {
  const movies = await prisma.movie.findMany();
  res.status(200).json({ movies });
};
module.exports = { getAllMovies };
