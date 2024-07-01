const prisma = require('../utils/prisma.js')

const getAllMovies = async () => await prisma.movie.findMany()

const createMovie = async (req) => await prisma.movie.create({
    data: {
        title: req.body.title,
        runtimeMins: req.body.runtimeMins
    }
})


module.exports = {
    getAllMovies,
    createMovie
}