const { Prisma } = require("@prisma/client")
const prisma = require('../utils/prisma')

// Get all movies
const getMovies = async (req, res) => {
    try {
        const allMovies = await prisma.movie.findMany({
            include: {
                screenings: true,
            }
        })
        res.status(200).json({
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

    //console.log("hi", req.body)
    try {
        const createdMovie = await prisma.movie.create({
            data: {
                title: req.body.title,
                runtimeMins: req.body.runtimeMins
            },
            include: {
                screenings: true
            }
        })
        res.status(201).json({ movie: createdMovie })
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
                id: +req.params.id
            },
            include: {
                screenings: true,
            }
        })
        res.status(200).json({ movie: uniqueMovieById })
    } catch (err) {
        //console.log( err )
        res.status(404).json({ error: err })
    }
}

// Update a movie
const updateMovie = async (req, res) => {
    try {
        //console.log(+req.params.id)
        const updateMovieById = await prisma.movie.update({
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
        res.status(201).json( {movies: updateMovieById} )
    }  catch (err) {
        res.status(404).json({ error: err })
    }
}


module.exports = {
    getMovies,
    createMovie,
    getMovieById,
    updateMovie
}