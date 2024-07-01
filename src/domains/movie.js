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

module.exports = {
  getAllMoviesDb
}