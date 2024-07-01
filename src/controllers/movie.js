const { getAllMovies, createMovie, updateMovie, getAllMoviesByRuntimeLt, getAllMoviesByRuntimeGt } = require('../domains/movie.js')


const getAll = async (req, res) => {
    let allMovies
    if(!req.query.runtimeGt || !req.query.runtimeLt) {
        allMovies = (await getAllMovies()).map(m => m)
    } 
    if(req.query.runtimeGt) {
        allMovies = (await getAllMoviesByRuntimeGt(req.query.runtimeGt)).map(m => m)
    }
    if (req.query.runtimeLt) {
        allMovies = (await getAllMoviesByRuntimeLt(req.query.runtimeLt)).map(m => m)
    }
    
    res.status(200).json({
        movies: allMovies
    })
}

const addMovie = async (req, res) => {
    const newMovie = await createMovie(req)

    res.status(201).json({
        movie: newMovie
    })
}

const findByID = async (req, res) => {
    const id = Number(req.params.id)
    const found = (await getAllMovies()).find((m) => m.id === id)
    res.status(200).json({
        movie: found
    })
}

const updateMovieByID = async (req, res) => {
    const updatedMovie = await updateMovie(req)
    res.status(201).json({
        movie: updatedMovie
    })
}

module.exports = {
    getAll,
    addMovie,
    findByID,
    updateMovieByID
}