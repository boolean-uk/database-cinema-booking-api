const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const getAllMovies = async () => {
  const movies = await prisma.movie.findMany({
    include: {
      screenings: true
    }
  })
  return movies
}

const getMovieByID = async (id) => {
  const movie = await prisma.movie.findUnique({
    where: { id: Number(id)},
    include: {
      screenings: true
    }
  })
  return movie
}

const createMovie = async (title, runtimeMins) => {
  const movie = await prisma.movie.create({
    data: {
      title,
      runtimeMins
    },
    include: {
      screenings: true
    }
  })
  return movie
}

const updateMovie = async (title, runtimeMins, id) => {
  const movie = await prisma.movie.update({
    where: { id: Number(id)},
    data: {
      title: title,
      runtimeMins: runtimeMins
    },
    include: {
      screenings: true
    }
  })
  return movie
}

module.exports = {
  getAllMovies,
  getMovieByID,
  createMovie,
  updateMovie
}