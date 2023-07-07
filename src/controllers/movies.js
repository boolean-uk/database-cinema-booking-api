
const prisma = require('../utils/prisma')

const getAllMovies = async(req, res) => {
    return await prisma.movie.findMany({
        select: {
            id: true,
            title: true,
            runtimeMins: true,
            createdAt: true,
            updatedAt: true,
            screenings: true
        }
    })
}

const createMovie = async(req, res) => {
    
    const {title, runtimeMins} = req.body
  
    return await prisma.movie.create({
        data: {
            title,
            runtimeMins
        },
        select: {
            id: true,
            title: true,
            runtimeMins: true,
            createdAt: true,
            updatedAt: true,
            screenings: true
        }

    })
}

const getMovieById = async(id, res) => {
    const result = await prisma.movie.findUnique({
        where: {
            id: Number(id)
        },
        select: {
            id: true,
            title: true,
            runtimeMins: true,
            createdAt: true,
            updatedAt: true,
            screenings: true
        }
    })

    return result
}

const updateMovieById = async(id, req, res) => {
    const {title, runtimeMins} = req.body

    return await prisma.movie.update({
        where: {id: Number(id)},
        data: {
            title,
            runtimeMins
        },
        select: {
            id: true,
            title: true,
            runtimeMins: true,
            createdAt: true,
            updatedAt: true,
            screenings: true
        }
    })
}

module.exports = {
    getAllMovies,
    createMovie,
    getMovieById,
    updateMovieById
}