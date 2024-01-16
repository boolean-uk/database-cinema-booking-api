const {getAllMoviesDB} = require('../domains/movie.js')

const getAllMovies = async (req, res) => {

    const allMovies = await getAllMoviesDB()

    res.status(200).json({movies: allMovies})
}

module.exports = {
    getAllMovies
}