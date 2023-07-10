const { Prisma } = require("@prisma/client")
const prisma = require('../utils/prisma')

const getAll = async (req, res) => {
    const movies = await prisma.movie.findMany({
        include: {
            screenings: true
        }
    })
    return res.status(200).json({movies})
}

const createMovie = async (req, res) => {
    const {
        title,
        runtimeMins
    } = req.body

    if (!title || !runtimeMins) {
        return res.status(400).json({
            error: "Missing fields in request body"
        })
    }

    const createdMovie = await prisma.movie.create({
        data: {
            title,
            runtimeMins,
        },
        include: {
            screenings: true
        }
    })

    res.status(201).json({movie: createdMovie})
}

const getById = async (req, res) => {
    const id = Number(req.params.id)
    const movie = await prisma.movie.findUnique({
        where: {
            id: id,
        },
        include: {
            screenings: true
        }
    })

    res.status(200).json({movie: movie})
}

module.exports = {
    getAll,
    createMovie,
    getById
}