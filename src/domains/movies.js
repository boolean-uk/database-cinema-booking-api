const { movie } = require('../utils/prisma')

const getAllMoviesDb = async () => {
  const movies = await movie.findMany()

  return movies
}

module.exports = {
  getAllMoviesDb
}
