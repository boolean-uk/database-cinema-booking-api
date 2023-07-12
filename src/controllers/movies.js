
const prisma = require('../utils/prisma')


const getAllMovies = async(req, res) => {
    const movies = await prisma.movie.findMany({
        select: {
            id: true,
            title: true,
            runtimeMins: true,
            createdAt: true,
            updatedAt: true,
            screenings: true
        }
    })

    res.json({movies})
}

const createMovie = async(req, res) => {
    
    const {title, runtimeMins} = req.body
  
    const movie = await prisma.movie.create({
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

    res.status(201).json({movie})


}

const getMovieById = async(req, res) => {
    const movie = await prisma.movie.findUnique({
        where: {
            id: Number(req.params.id)
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

    res.json({movie})
}

const updateMovieById = async(req, res) => {
    const {title, runtimeMins} = req.body

    const movie = await prisma.movie.update({
        where: {id: Number(req.params.id)},
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

    res.status(201).json({movie})
}

module.exports = {
    getAllMovies,
    createMovie,
    getMovieById,
    updateMovieById
}