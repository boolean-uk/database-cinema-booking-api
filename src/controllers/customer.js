const { PrismaClientKnownRequestError } = require('@prisma/client')

// DB
const {
  createCustomerDb,
  updateCustomerByIdDb,
  getCustomerByIdDb
} = require('../domains/customer.js')

// Error handler
const {
  fieldsErrorHandler,
  errorCreator
} = require('../helpers/errorsHandler.js')

// Global functions
const findCustomerById = async (customerId) => {
  const foundCustomer = await getCustomerByIdDb(customerId)

  if (!foundCustomer) {
    throw errorCreator('A customer does not exist with the provided id', 404)
  }

  return foundCustomer
}

const createCustomer = async (req, res) => {
  const { name, phone, email } = req.body

  try {
    fieldsErrorHandler([name, phone, email])

    const createdCustomer = await createCustomerDb(name, phone, email)

    res.status(201).json({ customer: createdCustomer })
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return res
          .status(409)
          .json({ error: 'A customer with the provided email already exists' })
      }
    }

    res.status(error.status ?? 500).json({ error: error.message })
  }
}

const updateCustomerById = async (req, res, next) => {
  const { id } = req.params
  const { name, contact } = req.body

  try {
    fieldsErrorHandler([name])
    await findCustomerById(id)

    const updatedCustomer = await updateCustomerByIdDb({ name, contact }, id)

    res.status(201).json({
      customer: updatedCustomer
    })
  } catch (error) {
    res.status(error.status ?? 500).json({ error: error.message })
  }
}

module.exports = {
  createCustomer,
  updateCustomerById,
  findCustomerById
}

// Prisma error codes: https://www.prisma.io/docs/orm/reference/error-reference#common
// HTTP error codes: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses
