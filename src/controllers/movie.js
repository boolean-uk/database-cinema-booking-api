const { PrismaClientKnownRequestError } = require("@prisma/client")
const { getMovieListDb, createMovieDb, getMovieByIdDb } = require('../domains/movie.js')

// GET MOVIE LIST
const getMovieList = async (req, res) => {
    const movieList = await getMovieListDb()
    res.status(200).json({ movies: movieList })
}

// CREATE MOVIE
const createMovie = async (req, res) => {
    const { title, runtimeMins } = req.body
    const newMovie = await createMovieDb(title, runtimeMins)
    res.status(201).json({ movie: newMovie })
}

// GET MOVIE BY ID
const getMovieById = async (req, res) => {
    const id = Number(req.params.id)
    const foundMovie = await getMovieByIdDb(id)
    res.status(200).json({ movie: foundMovie })
}

module.exports = { getMovieList, createMovie, getMovieById }