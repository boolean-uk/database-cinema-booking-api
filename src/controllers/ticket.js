// Error handlers
const { fieldsErrorHandler } = require('../helpers/errorsHandler')
const { findCustomerById } = require('./customer')

// Controllers
const { findScreeningById } = require('./screenings')

// DB
const { createTicketDb } = require('../domains/ticket')

const createTicket = async (req, res, next) => {
  const { screeningId, customerId } = req.body

  try {
    fieldsErrorHandler([screeningId, customerId])
    await findScreeningById(screeningId)
    await findCustomerById(customerId)

    const createdTicket = await createTicketDb(screeningId, customerId)

    res.status(201).json({ ticket: createdTicket })
  } catch (error) {
    res.status(error.status ?? 500).json({ error: error.message })
  }
}

module.exports = {
  createTicket
}
