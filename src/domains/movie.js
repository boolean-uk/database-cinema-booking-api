const prisma = require("../utils/prisma")

const getAllMoviesDb = async () =>
  await prisma.movie.findMany({
    include: {
      screenings: true
    }
  })

const createMovieDb = async (title, runtimeMins) =>
  await prisma.movie.create({
    data: {
      title: title,
      runtimeMins: runtimeMins
    },
    include: {
      screenings: true
    }
  })

const getMovieByIdDb = async (id) =>
  await prisma.movie.findUnique({
    where: {
      id: id
    },
    include: {
      screenings: true
    }
  })

const updateMovieDb = async (id, title, runtimeMins) =>
  await prisma.movie.update({
    where: {
      id: id
    },
    data: {
      title: title,
      runtimeMins: runtimeMins
    },
    include: {
      screenings: true
    }
  })

module.exports = {
  getAllMoviesDb,
  createMovieDb,
  getMovieByIdDb,
  updateMovieDb
}
