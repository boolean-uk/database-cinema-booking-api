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

const getMovieById = async (id) => {
    const movie = await prisma.movie.findUnique({
        where: {
            id: parseInt(id)
        },
        include: {
            screenings: true
        }
    })
    return movie
}

const updateMovieById = async (id, title, runtimeMins) => {
    const movie = await prisma.movie.update({
        where: {
            id: id
        },
        data: {
            title: title,
            runtimeMins: runtimeMins
        },
        include: {
            screenings: true
        }
    })
    return movie
}

module.exports = { getListMovies, postMovie, getMovieById, updateMovieById }