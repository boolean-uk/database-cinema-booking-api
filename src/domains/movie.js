const prisma = require('../utils/prisma')

const getAllMoviesDb = async () => await prisma.movie.findMany()

const createMovieDb = async (req, res) => {
  const { title, runtimeMins } =  req.body
  const movie = await prisma.movie.create({
    data: {
      title,
      runtimeMins
    }
  })
  return movie
}

module.exports = { 
  getAllMoviesDb,
  createMovieDb
}