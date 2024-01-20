const { movie } = require('../utils/prisma')

const getAllMoviesDb = async () => {
  const movies = await movie.findMany()

  return movies
}

const createMovieDb = async () => {
  const newMovie = await movie.create({
    data:{
      title,
      runtimeMins
    },
  })
  return newMovie
}

module.exports = {
  getAllMoviesDb,
  createMovieDb
}
