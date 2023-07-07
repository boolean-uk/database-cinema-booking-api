const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const getAllMovies = async (req, res) => {
  const movies = await prisma.movie.findMany({
    include: {
      screenings: true,
    },
  });

  return res.status(200).json({ movies });
};

const createMovies = async (req, res) => {
  const { title, runtimeMins, screenings } = req.body;
  const movie = await prisma.movie.create({
    data: {
      title,
      runtimeMins,
      screenings: {
        create: screenings,
      },
    },
    include: {
      screenings: true,
    },
  });
  return res.status(201).json({ movie });
};

const getMoviesID = async (req, res) => {
  const movieID = Number(req.params.id);
  const movie = await prisma.movie.findUnique({
    where: {
      id: movieID,
    },
    include: {
      screenings: true,
    },
  });
  return res.status(200).json({ movie });
};

const updateMovies = async (req, res) => {
  const movieID = Number(req.params.id);
  const { title, runtimeMins } = req.body;
  const movie = await prisma.movie.update({
    where: {
      id: movieID,
    },
    data: {
      title: title,
      runtimeMins: runtimeMins,
    },
    include: {
      screenings: true,
    },
  });
  return res.status(201).json({ movie });
};

module.exports = {
  getAllMovies,
  createMovies,
  getMoviesID,
  updateMovies,
};
