const { getAllMoviesDb, createMovieDb, getMovieByIdDb } = require("../domains/movie")

async function getAllMovies(req, res) {
    const movies = await getAllMoviesDb()

    res.json({
        movies
    })
}

async function createMovie(req, res) {
    const { title, runtimeMins } = req.body

    const createdMovie = await createMovieDb(title, runtimeMins)

    res.status(201).json({
        movie: createdMovie
    })
}

async function getMovieById(req, res) {
    const movieId = Number(req.params.id)
    const movie = await getMovieByIdDb(movieId)

    res.json({
        movie
    })
}

module.exports = {
    getAllMovies,
    createMovie,
    getMovieById
  }