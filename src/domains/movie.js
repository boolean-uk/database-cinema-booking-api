const prisma = require('../utils/prisma')

const getMovieListDb = async () => await prisma.movie.findMany({
    include: {
        screenings: true
    }
})

module.exports = { getMovieListDb }