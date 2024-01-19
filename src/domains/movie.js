const prisma = require("../utils/prisma");

const getMoviesDb = async () =>
  await prisma.movie.findMany({
    include: {
      screenings: true,
    },
  });

const createMovieDb = async (req, res) => {
  const { title, runtimeMins } = req.body;
  const movie = await prisma.movie.create({
    data: {
      title,
      runtimeMins,
      screenings: {},
    },
    include: {
      screenings: true,
    },
  });
  return movie;
};

const getMovieByIdDb = async (id) =>
  await prisma.movie.findUnique({
    where: {
      id,
    },
    include: {
      screenings: true,
    },
  });

const updateMovieDb = async (req, res) => {
  const id = Number(req.params.id);
  const { title, runtimeMins } = req.body;
  const movie = await prisma.movie.update({
    where: {
      id: id,
    },
    data: {
      title,
      runtimeMins,
    },
    include: {
      screenings: true,
    },
  });
  return movie;
};

module.exports = { getMoviesDb, createMovieDb, getMovieByIdDb, updateMovieDb };
