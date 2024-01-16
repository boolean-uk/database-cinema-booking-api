const prisma = require('../utils/prisma')

const getAllMoviesDB = async () => await prisma.movie.findMany()


module.exports = {
    getAllMoviesDB
}