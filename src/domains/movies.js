const prisma = require('../utils/prisma')

const getMoviesDb = async () => await prisma.movie.findMany()

const getMovieByIdDb = async (id) => await prisma.movie.findUnique({
    where: {
        id: id
    }
})

module.exports = {
    getMoviesDb,
    getMovieByIdDb
}