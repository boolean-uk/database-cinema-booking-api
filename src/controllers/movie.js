const { getAllMoviesDb, createdMovieDb, getMovieDb } = require('../domains/movie.js')
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


module.exports = {
  getAllMovies,
  createdMovie,
  getMovieById
}