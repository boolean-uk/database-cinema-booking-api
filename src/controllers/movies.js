
const prisma = require('../utils/prisma')

const getAllMovies = async(req, res) => {
    return await prisma.movie.findMany()
}

module.exports = {
    getAllMovies
}