const prisma = require('../utils/prisma')

const getAllMoviesDb = async () => await prisma.movie.findMany()

module.exports = { 
  getAllMoviesDb
}