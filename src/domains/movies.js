const { movie } = require('../utils/prisma')

const getAllMoviesDb = async (runtimeLt, runtimeGt) => {
  const movies = await movie.findMany({
    where: {
      runtimeMins: {
        ...(runtimeLt ? { lt: Number(runtimeLt) } : {}),
        ...(runtimeGt ? { gt: Number(runtimeGt) } : {})
      }
    },
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

const updateMovieByIdDb = async (fields, movieId) => {
  const updatedMovie = await movie.update({
    where: {
      id: Number(movieId)
    },
    data: {
      title: fields.title,
      runtimeMins: fields.runtimeMins
    },
    include: {
      screenings: true
    }
  })

  return updatedMovie
}

module.exports = {
  getAllMoviesDb,
  createMovieDb,
  getMovieByIdDb,
  updateMovieByIdDb
}
