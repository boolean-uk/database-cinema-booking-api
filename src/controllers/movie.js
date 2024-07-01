const { getAllMovies, createMovie } = require('../domains/movie.js')


const getAll = async (req, res) => {
    
    const allMovies = (await getAllMovies()).map(m => m)
    res.status(200).json({
        movies: allMovies
    })
}

const addMovie = async (req, res) => {
    const newMovie = (await createMovie(req)).map(m => m)

    res.status(201).json({
        movie: newMovie
    })
}

module.exports = {
    getAll,
    addMovie
}