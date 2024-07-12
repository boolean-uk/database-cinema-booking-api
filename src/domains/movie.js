const prisma = require('../utils/prisma')


const getListMovies = async () => {
    const movies = await prisma.movie.findMany({
        include: {
            screenings: true
        }
    })
    return movies
}

const postMovie = async (title, runtimeMins) => {
    const movie = await prisma.movie.create({
        data: {
            title,
            runtimeMins,
            screenings: {}
        },
        include: {
            screenings: true
        }
    })
    return movie
}


module.exports = { getListMovies, postMovie }