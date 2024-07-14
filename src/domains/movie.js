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

const updateMovieById = async (movieId, title, runtimeMins, screenings) => {
    
    const updateData = await prisma.movie.update({
        where: { id: parseInt(movieId) },
        data: {
            title,
            runtimeMins,
            screenings: {
              update: screenings? screenings.map(screening => ({
                where: { id: screening.id },
                data: {
                  startsAt: screening.startsAt,
                  screenId: screening.screenId
                }
              })) : []
            }
        },

        include: {
            screenings: true
        }
    })
    return updateData
}

module.exports = { getListMovies, postMovie, getMovieById, updateMovieById }