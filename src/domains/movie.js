const prisma = require("../utils/prisma.js");

//get movies
const getMovieListDb = async () =>
  await prisma.movie.findMany({
    include: {
      screenings: true,
    },
  });

//create movies
const postMovieDb = async (title, runtimeMins) =>
  await prisma.movie.create({
    data: {
      title,
      runtimeMins,
    },
    include: {
      screenings: true,
    },
  });

//get movie by id
const getMovieByIdDb = async (id) =>
  await prisma.movie.findUnique({
    where: {
      id,
    },
    include: {
      screenings: true,
    },
  });

const updateMovieDb = async (id, title, runtimeMins) =>
  await prisma.movie.update({
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
module.exports = { getMovieListDb, postMovieDb, getMovieByIdDb, updateMovieDb };
