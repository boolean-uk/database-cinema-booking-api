const { Prisma } = require('@prisma/client');
const prisma = require('../utils/prisma');

const getAllMovies = async (req, res) => {
  const movies = await prisma.movie.findMany({
    include: {
      screenings: true,
    },
  });

  res.status(200).json({
    movies,
  });
};

const getMovieById = async (req, res) => {
  const movieId = parseInt(req.params.id);

  const movie = await prisma.movie.findUnique({
    where: {
      id: movieId,
    },
    include: {
      screenings: true,
    },
  });

  res.status(200).json({ movie });
};

const createMovie = async (req, res) => {
  const { title, runtimeMins } = req.body;

  if (!title || !runtimeMins) {
    res.status(400).json({ error: 'Missing body' });
  }

  const movie = await prisma.movie.create({
    data: {
      title,
      runtimeMins,
    },
    include: {
      screenings: true,
    },
  });

  res.status(201).json({ movie });
};

const updateMovie = async (req, res) => {
  const { title, runtimeMins } = req.body;

  if (!title || !runtimeMins) {
    res.status(400).json({ error: 'Missing body' });
  }

  const movieId = parseInt(req.params.id);

  const movie = await prisma.movie.update({
    data: {
      title,
      runtimeMins,
    },
    where: {
      id: movieId,
    },
    include: {
      screenings: true,
    },
  });

  res.status(201).json({ movie });
};

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
};
