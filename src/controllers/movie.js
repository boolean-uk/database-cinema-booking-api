const { getAllMovies } = require('../domains/movie.js')

const getAll = async (req, res) => {
    
    const allMovies = (await getAllMovies()).map(m => m)
    res.status(200).json({
        movies: allMovies
    })
}

module.exports = {
    getAll
}