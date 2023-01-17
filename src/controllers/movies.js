const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const getAllMovies = async (req, res) => {
  const movies = await prisma.movie.findMany({
    include: {
      screenings: true,
    },
  });
  res.json({ movies: movies });
};

const createAMovie = async (req, res) => {
  const { title, runtimeMins, screenings } = req.body;

  if (!title || !runtimeMins) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }

  {
    const createdMovie = await prisma.movie.create({
      data: {
        title,
        runtimeMins,
        screenings: { create: screenings },
      },
      include: {
        screenings: true,
      },
    });
    res.status(201).json({ movie: createdMovie });
  }
};

const getMovieById = async (req, res) => {
  const movie = await prisma.movie.findUnique({
    where: {
      id: Number(req.params.id),
    },
    include: {
      screenings: true,
    },
  });
  res.json({ movie: movie });
};

const updateMovie = async (req, res) => {
  const updatedMovie = await prisma.movie.update({
    where: {
      id: Number(req.params.id),
    },
    data: {
      title: req.body.title,
      runtimeMins: req.body.runtimeMins,
    },
    include: {
      screenings: true,
    },
  });
  res.status(201).json({ movie: updatedMovie });
};
module.exports = {
  getAllMovies,
  createAMovie,
  getMovieById,
  updateMovie,
};
