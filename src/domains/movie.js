const prisma = require('../utils/prisma')

// GET MOVIE LIST
const getMovieListDb = async () => await prisma.movie.findMany({
    include: { screenings: true }
})

// CREATE MOVIE
const createMovieDb = async (title, runtimeMins) => await prisma.movie.create({
    data: {
        title,
        runtimeMins
    },
    include: { screenings: true }
})

// GET MOVIE BY ID
const getMovieByIdDb = async (id) => await prisma.movie.findUnique({
    where: {
        id
    },
    include: { screenings: true }
})

module.exports = { getMovieListDb, createMovieDb, getMovieByIdDb }