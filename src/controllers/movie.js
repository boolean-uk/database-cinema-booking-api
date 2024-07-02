const { PrismaClientKnownRequestError } = require("@prisma/client/runtime/library")
const { getAllMoviesDb, createMovieDb, getMovieByIdDb, updateMovieDb } = require("../domains/movie")
const MissingFieldsError = require("../errors/missingFieldsError")
const NotFoundError = require("../errors/notFoundError")

async function getAllMovies(req, res) {
    const runtimeLt = Number(req.query.runtimeLt)
    const runtimeGt = Number(req.query.runtimeGt)

    const movies = await getAllMoviesDb(runtimeLt, runtimeGt)

    res.json({
        movies
    })
}

async function createMovie(req, res) {
    const { title, runtimeMins, screenings } = req.body

    if (!title || !runtimeMins) {
        throw new MissingFieldsError('Missing fields in request body')
    }

    const createdMovie = await createMovieDb(title, runtimeMins, screenings)

    res.status(201).json({
        movie: createdMovie
    })
}

async function getMovieByIdOrTitle(req, res) {
    const movieId = req.params.id

    try {
        const movie = await getMovieByIdDb(movieId)
 
        if(movie.length === 0) {
            throw new NotFoundError
        }

        res.json({
            movie
        })
    } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          if (e.code === "P2025") {
            throw new NotFoundError('Movie with that id or title does not exist')
          }
        }

        if (e instanceof NotFoundError) {
            throw new NotFoundError('Movie with that id or title does not exist')
        }
  
        res.status(500).json({ error: e.message })
    }

}

async function updateMovie(req, res) {
    const movieId = Number(req.params.id)
    const { title, runtimeMins, screenings } = req.body

    if (!title || !runtimeMins) {
        throw new MissingFieldsError('Missing fields in request body')
    }

    try {
        const updatedMovie = await updateMovieDb(movieId, title, runtimeMins, screenings)

        res.status(201).json({
            movie: updatedMovie
        })
    } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          if (e.code === "P2025") {
            throw new NotFoundError('Movie with that id or title does not exist')
          }
        }
  
        res.status(500).json({ error: e.message })
    }
}

module.exports = {
    getAllMovies,
    createMovie,
    getMovieByIdOrTitle,
    updateMovie
  }