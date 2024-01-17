const { getAllMoviesDb } = require('../domains/movie')

const getAllMovies = async (req, res) => {
  const movies = await getAllMoviesDb()
  return res.json({ movies })
}

module.exports = {
  getAllMovies
}