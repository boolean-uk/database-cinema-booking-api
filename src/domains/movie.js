const prisma = require('../utils/prisma')

const getAllMoviesDb = async () => await prisma.movie.findMany({
    include: {
        screenings: true
    }
})

const createMovieDb = async (title, runtimeMins) => await prisma.movie.create({
    data: {
        title: title,
        runtimeMins: runtimeMins
    }, include: {
        screenings: true
    }
})
  
  module.exports = {
    getAllMoviesDb,
    createMovieDb
  }