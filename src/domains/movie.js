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

const getMovieByIdDb = async (movieId) => await prisma.movie.findUnique({
    where: {
        id: movieId
    },
    include: {
        screenings: true
    }
})
  
  module.exports = {
    getAllMoviesDb,
    createMovieDb,
    getMovieByIdDb
  }