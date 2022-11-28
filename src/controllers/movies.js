const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const getMovies = async (req, res) => {
  const movies = await prisma.movie.findMany({
    include: {
      screenings: true,
    },
  });
  console.log("HERE", movies);
  res.json({ movies: movies });
};

const getMoviesById = async (req, res) => {
  const { id } = req.params;
  const movie = await prisma.movie.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      screenings: true,
    },
  });
  res.json({ movie: movie });
};

const createMovie = async (req, res) => {
  const movie = await prisma.movie.create({
    data: {
      title: req.body.title,
      runtimeMins: req.body.runtimeMins,
    },
    include: {
      screenings: true,
    },
  });
  res.status(201).json({ movie: movie });
};

const updateMoviesById = async (req, res) => {
  const { id } = req.params;
  const movie = await prisma.movie.update({
    where: {
      id: Number(id),
    },
    data: {
      title: req.body.title,
      runtimeMins: req.body.runtimeMins,
    },
    include: {
      screenings: true,
    },
  });
  res.status(201).json({ movie: movie });
};

module.exports = {
  getMovies,
  getMoviesById,
  createMovie,
  updateMoviesById,
};
