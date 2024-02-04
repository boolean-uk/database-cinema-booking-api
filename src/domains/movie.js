const prisma = require("../utils/prisma");

const getAllMoviesDb = async (runtimeMins) => {
  const movies = await prisma.movie.findMany({
    where: {
      runtimeMins,
    },
    include: {
      screenings: true,
    },
  });

  return movies;
};

const getMovieByIdDb = async (id) => {
  const foundMovie = await prisma.movie.findUnique({
    where: {
      id: id, 
    },
    include: {
      screenings: true,
    },
  });

  return foundMovie;
};

const createMovieDb = async (title, runtimeMins) => {
  const newMovie = await prisma.movie.create({
    data: {
      title: title,
      runtimeMins: runtimeMins,
    },
    include: {
      screenings: true,
    },
  });
  return newMovie;
};

const updateMovieDb = async (id, title, runtimeMins) => { // Added title and runtimeMins as parameters
  const updatedMovie = await prisma.movie.update({
    where: {
      id: id,
    },
    data: {
      title: title,
      runtimeMins: runtimeMins,
    },
    include: {
      screenings: true
    }
  });

  return updatedMovie;
};

module.exports = {
  getAllMoviesDb,
  getMovieByIdDb,
  createMovieDb,
  updateMovieDb,
};
