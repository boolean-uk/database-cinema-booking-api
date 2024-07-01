const prisma = require('../utils/prisma')

const getAllMoviesDb = async (runtimeLt, runtimeGt) => await prisma.movie.findMany({
    where: {
        OR: [
            {
            ...(runtimeLt ? {
            runtimeMins: {
                lt: runtimeLt
            }
        } : {})},
        {...(runtimeGt ? {
            runtimeMins: {
                gt: runtimeGt
            }
        } : {})}
    ]
    },
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

const updateMovieDb = async (movieId, title, runtimeMins) => await prisma.movie.update({
    where: {
        id: movieId
    }, data: {
        title: title,
        runtimeMins: runtimeMins
    },
    include: {
        screenings: true
    }
})
  
  module.exports = {
    getAllMoviesDb,
    createMovieDb,
    getMovieByIdDb,
    updateMovieDb
  }