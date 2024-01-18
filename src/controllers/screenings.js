// Error handlers
const { errorCreator } = require('../helpers/errorsHandler')

// DB
const { getScreeningByIdDb } = require('../domains/screenings')

// Global functions
const findScreeningById = async (screeningId) => {
  const foundScreening = await getScreeningByIdDb(screeningId)

  if (!foundScreening) {
    throw errorCreator('A screening does not exist with the provided id', 404)
  }

  return foundScreening
}

module.exports = {
  findScreeningById
}
