const prisma = require("../utils/prisma");

const getAllMovies = async (_req, res) => {
  const movies = await prisma.movie.findMany();
  res.status(200).json({ movies });
};

const createMovie = async (req, res) => {
  const { title, runtimeMins } = req.body;

  const createdMovie = await prisma.movie.create({
    data: { title, runtimeMins },
  });

  return res.status(201).json({ movie: createdMovie });
};

module.exports = { getAllMovies, createMovie };
