const { PrismaClientKnownRequestError } = require("@prisma/client")
const { moviesDb, createMovieDb, getMovieByIdDb } = require('../domains/movies')

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

module.exports = {
    moviesList,
    newMovie,
    getMovieById
}

