const {getAllMoviesDB, createMovieDB} = require('../domains/movie.js')

const getAllMovies = async (req, res) => {
    const allMovies = await getAllMoviesDB()
    res.status(200).json({movies: allMovies})
}

const createMovie = async (req, res) => {
    const {title, runtimeMins} = req.body
    const newMovie = await createMovieDB(title, runtimeMins)
    res.status(201).json({movie: newMovie})
}

module.exports = {
    getAllMovies,
    createMovie
}