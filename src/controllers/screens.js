// DB
const { createScreenDb } = require('../domains/screens')

// Error handler
const { fieldsErrorHandler } = require('../helpers/errorsHandler')

const createScreen = async (req, res, next) => {
  const { number } = req.body

  try {
    fieldsErrorHandler([number])

    const createdScreen = await createScreenDb(number)

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
