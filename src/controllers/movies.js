const { getAllMoviesDb } = require('../domains/movies')

const getAllMovies = async (req, res, next) => {
  try {
    const movies = await getAllMoviesDb()

    res.status(200).json({ movies: movies })
  } catch (error) {
    res.status(error.status ?? 500).json({ error: e.message })
  }
}

module.exports = {
  getAllMovies
}
