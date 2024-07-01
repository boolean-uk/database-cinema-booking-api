const { getAllMoviesDb } = require("../domains/movie")

async function getAllMovies(req, res) {
    const movies = await getAllMoviesDb()

    res.json({
        movies
    })
}

module.exports = {
    getAllMovies
  }