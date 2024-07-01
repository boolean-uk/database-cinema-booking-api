const { PrismaClientKnownRequestError } = require("@prisma/client")
const { getMoviesDb, createMovieDb, getMovieByIdDb, updateMovieByIdDb } = require('../domains/movies.js')


async function getMovies(req, res) {
    const movies = await getMoviesDb()
    res.status(200).json({ movies })
  }

  async function createMovie(req, res) {
    const newMovie = req.body
    const movie = await createMovieDb(newMovie)
    res.status(201).json({ movie })
  }

  async function getMovieById(req, res) {
    const id = Number(req.params.id)
    const movie = await getMovieByIdDb(id)
    res.status(200).json( { movie } )
  }

async function updateMovieById(req, res) {
    const id = Number(req.params.id)
    const updatedProps = req.body
    const movie = await updateMovieByIdDb(id, updatedProps)
    res.status(201).json( { movie } )
}

  module.exports = {
    getMovies,
    createMovie,
    getMovieById,
    updateMovieById
  }