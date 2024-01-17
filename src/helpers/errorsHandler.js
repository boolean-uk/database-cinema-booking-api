const { getAllMoviesDb } = require('../domains/movies')
const { getAllScreensDb } = require('../domains/screens')

const errorCreator = (message, status) => {
  const error = new Error(message)
  error.status = status
  return error
}

const fieldsErrorHandler = (fields) => {
  fields.forEach((field) => {
    if (!field) {
      throw errorCreator('Missing fields in request body', 400)
    }
  })
}

const titleErrorHandler = async (title) => {
  const allMovies = await getAllMoviesDb()

  const foundMovie = allMovies.find((movie) => movie.title === title)

  if (foundMovie) {
    throw errorCreator('A movie with the provided title already exists', 409)
  }
}

const screenNumberErrorHandler = async (screenNumber) => {
  const allScreens = await getAllScreensDb()

  const foundScreen = allScreens.find(
    (screen) => screen.number === screenNumber
  )

  if (foundScreen) {
    throw errorCreator('A screen with the provided number already exist', 409)
  }
}

module.exports = {
  errorCreator,
  fieldsErrorHandler,
  titleErrorHandler,
  screenNumberErrorHandler
}
