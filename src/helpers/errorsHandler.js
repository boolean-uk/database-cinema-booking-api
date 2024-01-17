const { getAllMoviesDb } = require('../domains/movies')

const errorCreator = (message, status) => {
  console.log(message, status)
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

module.exports = {
  errorCreator,
  fieldsErrorHandler,
  titleErrorHandler
}
