const prisma = require("../utils/prisma");

const getAllMoviesDb = async () => {
  return await prisma.movie.findMany({
    include: {
      screenings: true,
    },
  });
};
const createMovieDb = async (title, runtimeMins) => {
  return await prisma.movie.create({
    data: {
      title,
      runtimeMins,
    },
    include: {
      screenings: true,
    },
  });
};
const getAMovieByIdDb = async (id) => {
  return await prisma.movie.findUnique({
    where: {
      id,
    },
    include: {
      screenings: true,
    },
  });
};
const updateMoviebyIdDb = async (id, title, runtimeMins) => {
  return await prisma.movie.update({
    where: {
      id,
    },
    data: {
      title,
      runtimeMins,
    },
    include: {
      screenings: true,
    },
  });
};

module.exports = {
  getAllMoviesDb,
  createMovieDb,
  getAMovieByIdDb,
  updateMoviebyIdDb,
};