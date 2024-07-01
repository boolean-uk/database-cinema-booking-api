const { getAllMoviesDb, createdMovieDb, getMovieDb, updateMovieDb } = require('../domains/movie.js')
const { movie } = require('../utils/prisma.js')


const getAllMovies = async (req, res) => {
 try {
  const movies = await getAllMoviesDb()
  res.status(200).json(movies)
 } catch (e) {
  res.status(500).json({error : 'something went Wrong!'})
 }
}

const createdMovie = async (req, res) => {
  const { title , runtimeMins } = req.body
  try {
    const newMovie = await createdMovieDb(title, runtimeMins)
    res.status(201).json({newMove : newMovie})
  } catch (error) {
      res.status(500).json({error : 'coulnt create new Movie at controller!'})
  }
}

const getMovieById = async (req, res) => {
  const id = Number(req.params.id)
  try {
    const movie = await getMovieDb(id)
    res.status(200).json({movie : movie})
  } catch (error) {
      res.status(500).json({error: 'could not found the movie!'})
  }
}

const updateMovie = async (req, res) => {
  const id = Number(req.params.id)
  const { title , runtimeMins } = req.body

  if (!id || !title || !runtimeMins) {
    return res.status(400).json({error: 'Missing fields in request body!'})
  }

  try {
    const updatedMovie = await updateMovieDb(id, title, runtimeMins)
    if(!updatedMovie) {
      res.status(404).jspn({error : 'Movie not found!'})
    }
    res.status(201).json({ movie : updatedMovie})
  } catch (error) {
    res.status(500).json({error : 'Could not update the movie!'})
  }
}


module.exports = {
  getAllMovies,
  createdMovie,
  getMovieById,
  updateMovie
}