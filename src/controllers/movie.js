const { getAllMoviesDb } = require('../domains/movie.js')


const getAllMovies = async (req, res) => {
 try {
  const movies = await getAllMoviesDb()
  res.status(200).json(movies)
 } catch (e) {
  res.status(500).json({error : 'something went Wrong!'})
 }
}

module.exports = {
  getAllMovies
}