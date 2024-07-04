const prisma = require('../utils/prisma.js')

const getAllMovies = async () => await prisma.movie.findMany({
    include: {
        screenings: true
    }
})

const createMovie = async (title,
    runtimeMins) => await prisma.movie.create({
    data: {
        title: title,
        runtimeMins: runtimeMins
    },
    include: {
        screenings: true
    }
})

const updateMovie = async (id, title,
    runtimeMins) => await prisma.movie.update({
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

const getAllMoviesByRuntimeGt = async (query) => await prisma.movie.findMany({
    where: {
        runtimeMins: {
            gt: query
        }
    },
    include: {
        screenings: true
    }
})

const getAllMoviesByRuntimeLt = async (query) => await prisma.movie.findMany({
    where: {
        runtimeMins: {
            lt: query
        }
    },
    include: {
        screenings: true
    }
})

const getMovieById = async (id) => await prisma.movie.findUnique({
    where: {
        id: id
    },
    include: {
        screenings: true
    }
})

const getMovieByTitle = async (title) => await prisma.movie.findFirst({
    where: {
        title: title
    },
    include: {
        screenings: true
    }
})

module.exports = {
    getAllMovies,
    createMovie,
    updateMovie,
    getAllMoviesByRuntimeGt,
    getAllMoviesByRuntimeLt,
    getMovieById,
    getMovieByTitle
}