const prisma = require('../utils/prisma.js')

const getAllMovies = async () => await prisma.movie.findMany()


module.exports = {
    getAllMovies
}