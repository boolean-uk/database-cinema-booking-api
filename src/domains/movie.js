const prisma = require('../utils/prisma')

const getAllMoviesDb = async () => await prisma.movie.findMany({
    include: {
        screenings: true
    }
  })
  
  module.exports = {
    getAllMoviesDb
  }