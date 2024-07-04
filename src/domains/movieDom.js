const prisma = require("../utils/prisma");

const getMoviesDb = async () => {
  return await prisma.movie.findMany({
    include: {
      screenings: true,
    },
  });
};

const createMovieDb = async (data) => {
  const result = await prisma.movie.create({
    data,
    include: {
      screenings: true,
    },
  });
  return result;
};

const getMovieDb = async (id) => {
  const result = await prisma.movie.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      screenings: true,
    },
  });
  return result;
};

const updateMovieDb = async (id, data) => {
  const result = await prisma.movie.update({
    where: {
      id,
    },
    data,
    include: {
      screenings: true,
    },
  });
  return result;
};

const deleteMovieDb = async (id) => {
  const deleteScreenings = prisma.screening.deleteMany({
    where: {
      movieId: id,
    },
  });

  const deleteMovie = prisma.movie.delete({
    where: {
      id,
    },
  });

  const transaction = await prisma.$transaction([
    deleteScreenings,
    deleteMovie,
  ]);
};

module.exports = {
  getMoviesDb,
  getMovieDb,
  createMovieDb,
  updateMovieDb,
  deleteMovieDb,
};
