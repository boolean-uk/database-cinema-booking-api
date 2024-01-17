const { movie } = require('../utils/prisma')

const getAllMoviesDb = async () => {
  const movies = await movie.findMany({
    include: {
      screenings: true
    }
  })

  return movies
}

const createMovieDb = async (title, runtimeMins) => {
  const createdMovie = await movie.create({
    data: {
      title: title,
      runtimeMins: runtimeMins
    },
    include: {
      screenings: true
    }
  })

  return createdMovie
}

const getMovieByIdDb = async (movieId) => {
  const foundMovie = await movie.findFirst({
    where: {
      id: Number(movieId)
    },
    include: {
      screenings: true
    }
  })

  return foundMovie
}

module.exports = {
  getAllMoviesDb,
  createMovieDb,
  getMovieByIdDb
}
