const { PrismaClientKnownRequestError } = require("@prisma/client")
const { getMoviesDb, createMovieDb, getMovieByIdDb, updateMovieByIdDb, getMoviesWithQueryDb } = require('../domains/movies.js')
const { MissingFieldsError, DataAlreadyExistsError } = require("../errors/errors.js")


async function getMovies(req, res) {
    let movies;
    if(Object.keys(req.query).length > 0) {
      movies = await getMoviesWithQueryDb(req.query)
    } else {
      movies = await getMoviesDb()
    }
    res.status(200).json({ movies })
  }

  async function createMovie(req, res) {
    const newMovie = req.body
    const movies = await getMoviesDb()

    if(movies.find((movie) => movie.title === newMovie.title)) {
      throw new DataAlreadyExistsError('A movie with that title already exists')
    }

    const requiredFields = ['title', 'runtimeMins']
    if (!requiredFields.every((field) => newMovie[field])) {
      throw new MissingFieldsError('Movies require a title and runtime')
    }

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