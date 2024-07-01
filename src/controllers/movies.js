const { run } = require('jest')
const {
    createMovieDb,
    getAllMoviesDb,
    findMovieByIdDb,
    updateMovieByIdDb,
} = require('../domains/movies.js')
const { NotFoundError, RecordNotFound } = require('@prisma/client')

const getAllMovies = async (req, res) => {
    const movies = await getAllMoviesDb()

    console.log(movies)

    return res.status(200).json(movies)
}

const createMovie = async (req, res) => {
    const { title, runtimeMins } = req.body

    if (!title || !runtimeMins) {
        return res.status(400).json({
            error: 'Missing fields in request body',
        })
    }

    try {
        const createdMovie = await createMovieDb(title, runtimeMins)

        res.status(201).json({ movie: createdMovie })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}

const findMovieById = async (req, res) => {
    const id = Number(req.params.id)

    try {
        const searchedMovie = await findMovieByIdDb(id)

        res.status(200).json({ movie: searchedMovie })
    } catch (e) {
        if (e instanceof NotFoundError) {
            res.status(404).json({ error: e.message })
        }

        res.status(500).json({ error: e.message })
    }
}

const updateMovieById = async (req, res) => {
    const id = Number(req.params.id)

    const { title, runtimeMins } = req.body

    if (!title || !runtimeMins) {
        return res.status(400).json({
            error: 'Missing fields in request body',
        })
    }

    try {
        const updatedMovie = await updateMovieByIdDb(id, title, runtimeMins)

        res.status(201).json({ movie: updatedMovie })
    } catch (e) {
        if (e instanceof RecordNotFound) {
            res.status(404).json({ error: e.message })
        }

        res.status(500).json({ error: e.message })
    }
}
module.exports = { getAllMovies, createMovie, findMovieById , updateMovieById}
