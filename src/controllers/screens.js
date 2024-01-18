// DB
const { createScreenDb } = require('../domains/screens')

// Error handler
const {
  fieldsErrorHandler,
  screenNumberErrorHandler
} = require('../helpers/errorsHandler')

const createScreen = async (req, res, next) => {
  const { number, screenings } = req.body

  try {
    fieldsErrorHandler([number])
    await screenNumberErrorHandler(number)

    const createdScreen = await createScreenDb(number, screenings)

    res.status(201).json({
      screen: createdScreen
    })
  } catch (error) {
    res.status(error.status ?? 500).json({ error: error.message })
  }
}

module.exports = {
  createScreen
}
