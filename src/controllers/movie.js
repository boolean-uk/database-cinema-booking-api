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

const getMovieByID = async (req, res) => {
  const { id } = req.params;
  const movie = await prisma.movie.findUnique({ where: { id: Number(id) } });
  return res.status(200).json({ movie });
};

const updateMovieByID = async (req, res) => {
  const { id } = req.params;
  const { title, runtimeMins } = req.body;

  const updatedMovie = await prisma.movie.update({
    where: { id: Number(id) },
    data: { title, runtimeMins },
  });

  return res.status(201).json({ movie: updatedMovie });
};

module.exports = { getAllMovies, createMovie, getMovieByID, updateMovieByID };
