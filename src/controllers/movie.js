const { Prisma } = require("@prisma/client")
const prisma = require('../utils/prisma')

// Get all movies
const getMovies = async (req, res) => {
    try {
        const allMovies = await prisma.movie.findMany()
        res.status(201).json({
            movies: allMovies
        })
    } catch (err) {
        res.status(404).json({ 
            error: err
         })
    }
}

// Create a movie
const createMovie = async (req, res) => {
    try {
        const createdMovie = await prisma.movie.create({
            data: {
                title: req.body.title,
                runtimeMins: req.body.runtimeMins
            }
        })
        res.status(201).json({
            movies: createdMovie
        })
    } catch (err) {
        res.status(404).json({
            error: err
        })
    }
}

module.exports = {
    getMovies,
    createMovie
}