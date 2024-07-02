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

async function getMovieByIdDb (movieId) {
    if (!isNaN(movieId)) {
        return await prisma.movie.findUnique({
            where: {
                id: Number(movieId)
            },
            include: {
                screenings: true
            }
        })
    }

    return await prisma.movie.findMany({
        where: {
            title: movieId
        },
        include: {
            screenings: true
        }
    })
}

async function updateMovieDb(movieId, title, runtimeMins, screenings){
    const movieData = {
        where: {
            id: movieId
        }, data: {
            title: title,
            runtimeMins: runtimeMins
        },
        include: {
            screenings: true
        }
    }

    if(screenings) {
        movieData.data.screenings = {
            deleteMany: {},
            createMany: {
                    data: screenings.map((screening) => ({
                    startsAt: screening.startsAt,
                    screenId: screening.screenId
                }))
            }
        }
    }

    return await prisma.movie.update(movieData)
}
  
  module.exports = {
    getAllMoviesDb,
    createMovieDb,
    getMovieByIdDb,
    updateMovieDb
  }