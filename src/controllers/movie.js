const { PrismaClientKnownRequestError } = require("@prisma/client")
const { getMovieListDb, createMovieDb, getMovieByIdDb, updateMovieDb, getMovieListGtLtDb, getMovieListGtDb, getMovieListLtDb } = require('../domains/movie.js')

// GET MOVIE LIST
const getMovieList = async (req, res) => {
    if (req.query) {
        const runtimeLt = Number(req.query.runtimeLt)
        const runtimeGt = Number(req.query.runtimeGt)
        
        if (runtimeLt && runtimeGt) {
            const movieList = await getMovieListGtLtDb(runtimeLt, runtimeGt)
            return res.status(200).json({ movies: movieList })
        }

        if (runtimeLt) {
            const movieList = await getMovieListLtDb(runtimeLt)
            return res.status(200).json({ movies: movieList })
        }

        if (runtimeGt) {
            const movieList = await getMovieListGtDb(runtimeGt)
            return res.status(200).json({ movies: movieList })
        }
    }

    const movieList = await getMovieListDb()
    return res.status(200).json({ movies: movieList })
}

// CREATE MOVIE
const createMovie = async (req, res) => {
    const { title, runtimeMins } = req.body
    const newMovie = await createMovieDb(title, runtimeMins)
    res.status(201).json({ movie: newMovie })
}

// GET MOVIE BY ID
const getMovieById = async (req, res) => {
    const id = Number(req.params.id)
    const foundMovie = await getMovieByIdDb(id)
    res.status(200).json({ movie: foundMovie })
}

// UPDATE MOVIE BY ID
const updateMovie = async (req, res) => {
    const id = Number(req.params.id)
    const { title, runtimeMins } = req.body
    const updatedMovie = await updateMovieDb(id, title, runtimeMins)
    res.status(201).json({ movie: updatedMovie })
}

module.exports = { getMovieList, createMovie, getMovieById, updateMovie }