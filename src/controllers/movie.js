const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const getMovies = async (req, res) => {
  const movies = await prisma.movie.findMany({
    include: {
      screenings: true,
    },
  });
  res.status(200).json({ movies: movies });
};

const createMovie = async (req, res) => {
  const { title, runtimeMins } = req.body;
  const createdMovie = await prisma.movie.create({
    data: {
      title,
      runtimeMins,
    },
    include: {
      screenings: true,
    },
  });
  res.status(201).json({ movie: createdMovie });
};

const getMovieById = async (req, res) => {
  const movieId = Number(req.params.id);
  const movie = await prisma.movie.findUnique({
    where: {
      id: movieId,
    },
    include: {
      screenings: true,
    },
  });
  res.status(200).json({ movie: movie });
};

const updateMovie = async (req, res) => {
  const movieId = Number(req.params.id);
  const { title, runtimeMins } = req.body;
  const updatedMovie = await prisma.movie.update({
    where: {
      id: movieId,
    },
    data: {
      title,
      runtimeMins,
    },
    include: {
      screenings: true,
    },
  });
  res.status(201).json({ movie: updatedMovie });
};

module.exports = {
  getMovies,
  createMovie,
  getMovieById,
  updateMovie,
};
