const prisma = require('../utils/prisma')

// GET MOVIE LIST
const getMovieListDb = async () => await prisma.movie.findMany({
    include: {
        screenings: true
    }
})

// CREATE MOVIE
const createMovieDb = async (title, runtimeMins) => await prisma.movie.create({
    data: {
        title,
        runtimeMins
    },
    include: {
        screenings: true
    }
})

module.exports = { getMovieListDb, createMovieDb }