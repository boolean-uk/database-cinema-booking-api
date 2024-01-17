const { 
  getAllMoviesDb,
  createMovieDb
} = require('../domains/movie')

const getAllMovies = async (req, res) => {
  const movies = await getAllMoviesDb()
  return res.json({ movies })
}

const createMovie = async (req, res) => {
  const movie = await createMovieDb(req, res)
  return res.json({ movie })
}

module.exports = {
  getAllMovies,
  createMovie
}