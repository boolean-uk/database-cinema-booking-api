// DB
const {
  getAllMoviesDb,
  createMovieDb,
  getMovieByIdDb,
  updateMovieByIdDb
} = require('../domains/movies')

// Error handlers
const {
  fieldsErrorHandler,
  titleErrorHandler,
  errorCreator
} = require('../helpers/errorsHandler')

const getAllMovies = async (req, res, next) => {
  const { runtimeLt, runtimeGt } = req.query

  try {
    const movies = await getAllMoviesDb(runtimeLt, runtimeGt)

    res.status(200).json({ movies: movies })
  } catch (error) {
    res.status(error.status ?? 500).json({ error: error.message })
  }
}

const createMovie = async (req, res, next) => {
  const { title, runtimeMins, screenings } = req.body

  try {
    fieldsErrorHandler([title, runtimeMins])
    await titleErrorHandler(title)

    const createdMovie = await createMovieDb(title, runtimeMins, screenings)

    res.status(201).json({ movie: createdMovie })
  } catch (error) {
    res.status(error.status ?? 500).json({ error: error.message })
  }
}

const getMovieById = async (req, res, next) => {
  const { id } = req.params

  try {
    const foundMovie = await getMovieByIdDb(id)

    if (!foundMovie) {
      throw errorCreator('Movie with that id or title does not exist', 404)
    }

    res.status(200).json({ movie: foundMovie })
  } catch (error) {
    res.status(error.status ?? 500).json({ error: error.message })
  }
}

const updateMovieById = async (req, res, next) => {
  const { id } = req.params
  const { title, runtimeMins, screenings } = req.body

  try {
    fieldsErrorHandler([title, runtimeMins])
    await titleErrorHandler(title)

    const foundMovie = await getMovieByIdDb(id)

    if (!foundMovie) {
      throw errorCreator('Movie with that id does not exist', 404)
    }

    const updatedMovie = await updateMovieByIdDb(
      { title, runtimeMins, screenings },
      id
    )

    res.status(201).json({
      movie: updatedMovie
    })
  } catch (error) {
    res.status(error.status ?? 500).json({ error: error.message })
  }
}

module.exports = {
  getAllMovies,
  createMovie,
  getMovieById,
  updateMovieById
}
