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

module.exports = {
  getAllMoviesDb,
  createMovieDb
}
