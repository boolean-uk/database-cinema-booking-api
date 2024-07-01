const prisma = require('../utils/prisma.js')

const getAllMovies = async () => await prisma.movie.findMany({
    include: {
        screenings: true
    }
})

const createMovie = async (req) => await prisma.movie.create({
    data: {
        title: req.body.title,
        runtimeMins: req.body.runtimeMins
    },
    include: {
        screenings: true
    }
})


module.exports = {
    getAllMovies,
    createMovie
}