const { getAllMoviesDb, createMovieDb, getMovieByIdDb, updateMovieDb } = require("../domains/movie")

const getAllMovies = async (req, res) => {
    const movies = await getAllMoviesDb()

    res.json({
        movies: movies
    })
}

const createMovie = async (req, res) => {
    const { title, runtimeMins } = req.body

    const movie = await createMovieDb(title, runtimeMins)
    
    res.status(201).json({
        movie: movie
    })
}

const getMovieById = async (req, res) => {
    const id = Number(req.params.id)
    const movie = await getMovieByIdDb(id)
    
    res.json({
        movie: movie
    })
}

const updateMovie = async (req, res) => {
    const id = Number(req.params.id)
    const { title, runtimeMins } = req.body

    const movie = await updateMovieDb(id, title, runtimeMins)
    
    res.status(201).json({
        movie: movie
    })
}

module.exports = {
    getAllMovies,
    createMovie,
    getMovieById,
    updateMovie
}
