const { Prisma } = require("@prisma/client")
const prisma = require('../utils/prisma')

// Get all movies
const getAllMovies = async (req, res) => {
    try {
        if (Object.keys(req.query)[0] === "runtimeLt") {
            const allMovies = await prisma.movie.findMany({
                where: {
                    AND: [{ runtimeMins: { lte: +req.query.runtimeLt } }]
                },
                include: {
                    screenings: true,
                }
            })
            res.status(200).json({ movies: allMovies })
        } else if (Object.keys(req.query)[0] === "runtimeGt") {
            const allMovies = await prisma.movie.findMany({
                where: {
                    AND: [{ runtimeMins: { gte: +req.query.runtimeGt } }]
                },
                include: {
                    screenings: true,
                }
            })
            res.status(200).json({ movies: allMovies })
        }
    } catch (err) {
        res.status(404).json({ error: err })
    }
}

// Create a movie
const createMovie = async (req, res) => {
    try {
        const createdMovie = await prisma.movie.create({
            data: {
                title: req.body.title,
                runtimeMins: req.body.runtimeMins
            },
            include: {
                screenings: true,
            }
        })
        res.status(201).json({ movie: createdMovie })
    } catch (err) {
        res.status(404).json({ error: err })
    }
}

// Get movie by id
const getMovieById = async (req, res) => {
    try {
        const uniqueMovie = await prisma.movie.findUnique({
            where: {
                id: +req.params.id
            },
            include: {
                screenings: true,
            }
        })
        res.status(200).json({ movie: uniqueMovie })
    } catch (err) {
        res.status(404).json({ error: err })
    }
}

// Update movie by id
const updateMovieById = async (req, res) => {
    try {
        const updatedMovie = await prisma.movie.update({
            where: {
                id: +req.params.id
            },
            data: {
                title: req.body.title,
                runtimeMins: req.body.runtimeMins
            },
            include: {
                screenings: true,
            }
        })
        res.status(201).json({ movie: updatedMovie })
    } catch (err) {
        res.status(404).json({ error: err })
    }
}

module.exports = {
    getAllMovies, createMovie, getMovieById, updateMovieById
}
