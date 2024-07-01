const { getAllMoviesDb, createMovieDb, getMovieByIdDb, updateMovieDb } = require("../domains/movie")

async function getAllMovies(req, res) {
    const runtimeLt = Number(req.query.runtimeLt)
    const runtimeGt = Number(req.query.runtimeGt)

    const movies = await getAllMoviesDb(runtimeLt, runtimeGt)

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

async function updateMovie(req, res) {
    const movieId = Number(req.params.id)
    const { title, runtimeMins } = req.body

    const updatedMovie = await updateMovieDb(movieId, title, runtimeMins)

    res.status(201).json({
        movie: updatedMovie
    })
}

module.exports = {
    getAllMovies,
    createMovie,
    getMovieById,
    updateMovie
  }