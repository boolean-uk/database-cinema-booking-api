const prismaClient = require("../utils/prisma.js");

// Retrieve list of movies
const fetchMovieListFromDatabase = async () =>
  await prismaClient.movie.findMany({
    include: {
      screenings: true,
    },
  });

// Add a new movie
const createMovieInDatabase = async (title, runtimeMins) =>
  await prismaClient.movie.create({
    data: {
      title,
      runtimeMins,
    },
    include: {
      screenings: true,
    },
  });

// Retrieve a movie by ID
const findMovieByIdInDatabase = async (id) =>
  await prismaClient.movie.findUnique({
    where: {
      id,
    },
    include: {
      screenings: true,
    },
  });

// Update a movie by ID
const modifyMovieByIdInDatabase = async (id, title, runtimeMins) =>
  await prismaClient.movie.update({
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

module.exports = {
  fetchMovieListFromDatabase,
  createMovieInDatabase,
  findMovieByIdInDatabase,
  modifyMovieByIdInDatabase,
};
