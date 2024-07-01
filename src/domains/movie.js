const prisma = require('../utils/prisma')

const getAllMoviesDb = async (runtimeLt, runtimeGt) => await prisma.movie.findMany({
    where: {
        OR: [
            {
            ...(runtimeLt ? {
            runtimeMins: {
                lt: runtimeLt
            }
        } : {})},
        {...(runtimeGt ? {
            runtimeMins: {
                gt: runtimeGt
            }
        } : {})}
    ]
    },
    include: {
        screenings: true
    }
})

const createMovieDb = async (title, runtimeMins, screenings) => {
    const movieData = {
        data: {
        title: title,
        runtimeMins: runtimeMins
        }, include: {
        screenings: true
        }
    }

    if(screenings) {
        movieData.data.screenings = {
            createMany: {
                    data: screenings.map((screening) => ({
                    startsAt: screening.startsAt,
                    screenId: screening.screenId
                }))
            }
        }
    }

    return await prisma.movie.create(movieData)
}

const getMovieByIdDb = async (movieId) => await prisma.movie.findUnique({
    where: {
        id: movieId
    },
    include: {
        screenings: true
    }
})

const updateMovieDb = async (movieId, title, runtimeMins) => await prisma.movie.update({
    where: {
        id: movieId
    }, data: {
        title: title,
        runtimeMins: runtimeMins
    },
    include: {
        screenings: true
    }
})
  
  module.exports = {
    getAllMoviesDb,
    createMovieDb,
    getMovieByIdDb,
    updateMovieDb
  }