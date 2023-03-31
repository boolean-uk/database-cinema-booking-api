const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const retrieveMovies = async (req, res) => {
  const movies = await prisma.movie.findMany({
    include: {
      screenings: true,
    },
  });
  res.json({ movies });
};

const createMovie = async (req, res) => {
  const { title, runtimeMins } = req.body;

  const createdMovie = await prisma.movie.create({
    data: {
      title: title,
      runtimeMins: runtimeMins,
    },
    include: {
      screenings: true,
    },
  });
  res.status(201).json({ movie: createdMovie });
};

const retrieveMovieById = async (req, res) => {
  const movie = await prisma.movie.findUnique({
    where: { id: Number(req.params.id) },
    include: {
      screenings: true,
    },
  });
  res.json({ movie });
};

const updateMovie = async (req, res) => {
  const { title, runtimeMins } = req.body;

  const movie = await prisma.movie.update({
    where: { id: Number(req.params.id) },
    data: { title: title, runtimeMins: runtimeMins },
    include: {
      screenings: true,
    },
  });
  res.status(201).json({ movie });
};

module.exports = {
  retrieveMovies,
  createMovie,
  retrieveMovieById,
  updateMovie,
};
