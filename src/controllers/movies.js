const { PrismaClientKnownRequestError } = require("@prisma/client")
const { moviesDb, createMovieDb, getMovieByIdDb, updateMovieByIdDb } = require('../domains/movies')

const moviesList = async (req, res) => {
    const movies = await moviesDb()
    res.json({ movies })
}

const newMovie = async (req, res) => {
    const createdMovie = await createMovieDb(req, res)
    return res.status(201).json({ createdMovie })
}

const getMovieById = async (req, res) => {
    const id = Number(req.params.id)

    if(!id) {
       res.status(404).json({error: "you must provide a valid id"})
    }

    const movie = await getMovieByIdDb(req, res)
    return res.json({ movie })
}

const updateMovieById = async (req, res) => {
    const updatedMovie = await updateMovieByIdDb(req, res)
    return res.status(201).json({ updatedMovie })
}

module.exports = {
    moviesList,
    newMovie,
    getMovieById,
    updateMovieById
}

