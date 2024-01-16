const { PrismaClientKnownRequestError } = require("@prisma/client")
const { getMovieListDb, createMovieDb } = require('../domains/movie.js')

// GET MOVIE LIST
const getMovieList = async (req, res) => {
    const movieList = await getMovieListDb()
    res.status(200).json({ movies: movieList })
}

// CREATE MOVIE
const createMovie = async(req, res) => {
    const { title, runtimeMins } = req.body
    const newMovie = await createMovieDb(title, runtimeMins)
    res.status(201).json({ movie: newMovie })
}

module.exports = { getMovieList, createMovie }