const { 
  getAllMoviesDb,
  createMovieDb,
  getMovieByIdDb,
  updateMovieDb
} = require('../domains/movie')

const getAllMovies = async (req, res) => {
  const movies = await getAllMoviesDb()
  return res.json({ movies })
}

const getMovieById = async (req, res) => {
  const id = Number(req.params.id)

  if (!id) {
    return res.status(400).json({ error: "no id supplied"})
  }

  const movie = await getMovieByIdDb(req, res)
  return res.json({ movie })
}

const createMovie = async (req, res) => {
  const movie = await createMovieDb(req, res)
  return res.status(201).json({ movie })
}

const updateMovie = async (req, res) => {
  const movie = await updateMovieDb(req, res)
  return res.status(201).json({ movie })
}

module.exports = {
  getAllMovies,
  createMovie,
  getMovieById,
  updateMovie
}