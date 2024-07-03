const prisma = require('../utils/prisma.js')

const getAllMovies = async () => await prisma.movie.findMany({
    include: {
        screenings: true
    }
})

const createMovie = async (req) => await prisma.movie.create({
    data: {
        title: req.body.title,
        runtimeMins: req.body.runtimeMins
    },
    include: {
        screenings: true
    }
})

const updateMovie = async (req) => await prisma.movie.update({
    where: {
        id: Number(req.params.id)
    },
    data: {
        title: req.body.title,
        runtimeMins: req.body.runtimeMins
    },
    include: {
        screenings: true
    }
})

const getAllMoviesByRuntimeGt = async (query) => await prisma.movie.findMany({
    where: {
        runtimeMins: {
            gt: Number(query)
        }
    },
    include: {
        screenings: true
    }
})

const getAllMoviesByRuntimeLt = async (query) => await prisma.movie.findMany({
    where: {
        runtimeMins: {
            lt: Number(query)
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