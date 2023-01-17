const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const getAllMovies = async (req, res) => {
  try {
    const movies = await prisma.movie.findMany();
    res.json({ movies });
  } catch (error) {}
};

module.exports = { getAllMovies };
