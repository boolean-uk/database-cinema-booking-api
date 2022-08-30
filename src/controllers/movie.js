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

    //const { title, runtimeMins } = req.body

    console.log("hi", req.body)
    try {
        const createdMovie = await prisma.movie.create({
            data: {
                title: req.body.title,
                runtimeMins: req.body.runtimeMins,
            }
        })
        res.status(201).json({ movies: createdMovie })
    } catch (err) {
        //console.log( err )
        res.status(404).json({ error: err })
    }
}

const getMovieById = async (req, res) => {
    //console.log("MOVIE")

    try {
        //console.log(req.body.id)
        const uniqueMovieById = await prisma.movie.findUnique({
            where: {
                id: Number(req.params.id)
            }
        })
        res.status(201).json({ movies: uniqueMovieById })
    } catch (err) {
        //console.log( err )
        res.status(404).json({ error: err })
    }
}


module.exports = {
    getMovies,
    createMovie,
    getMovieById
}