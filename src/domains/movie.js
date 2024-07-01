const prisma = require('../utils/prisma')

const getAllMoviesDb = async () => {
  try {
    const movies = await prisma.movie.findMany({
      include: {
        screenings:true
      }
    })
    return movies
  } catch (error) {
    throw new Error('Failed to fetch movies from database.')
  }
}

const createdMovieDb = async (title, runtimeMins) => {
  try {
    const newMovie = await prisma.movie.create({
      data: {
        title,
        runtimeMins
      }
    })
    return newMovie
  } catch (error) {
    throw new Error('Failed to create a new movie.')
  }
}

module.exports = {
  getAllMoviesDb,
  createdMovieDb
}