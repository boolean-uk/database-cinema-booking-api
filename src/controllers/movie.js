const { getAllMoviesDb, createMovieDb } = require("../domains/movie")

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

module.exports = {
    getAllMovies,
    createMovie
  }