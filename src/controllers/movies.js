const { Prisma } = require('@prisma/client');
const prisma = require('../utils/prisma');

const createMovie = async (req, res) => {
  const { title, runtimeMins } = req.body;

  if (!title || !runtimeMins) {
    return res.status(400).json();
  }

  try {
    const createdMovie = await prisma.movie.create({
      data: {
        title,
        runtimeMins,
      },
    });

    res.status(201).json({ movie: createdMovie });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const getMovies = async (req, res) => {
  try {
    const movies = await prisma.movie.findMany({
      include: {
        screenings: true,
      },
    });

    res.status(200).json({ movies });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const getMovieById = async (req, res) => {
  const { id } = req.params;

  try {
    const movie = await prisma.movie.findUnique({
      where: { id: parseInt(id) },
      include: {
        screenings: true,
      },
    });

    if (!movie) {
      return res.status(404).json();
    }

    res.status(200).json({ movie });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const updateMovie = async (req, res) => {
  const { id } = req.params;
  const { title, runtimeMins } = req.body;

  if (!title || !runtimeMins) {
    return res.status(400).json();
  }

  try {
    const updatedMovie = await prisma.movie.update({
      where: { id: parseInt(id) },
      data: {
        title,
        runtimeMins,
      },
    });

    res.status(200).json({ movie: updatedMovie });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  createMovie,
  getMovies,
  getMovieById,
  updateMovie,
};
