const { getAllMoviesDb, createdMovieDb } = require('../domains/movie.js')


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
    es.status(500).json({error : 'coulnt create new Movie at controller!'})
  }
}


module.exports = {
  getAllMovies,
  createdMovie
}