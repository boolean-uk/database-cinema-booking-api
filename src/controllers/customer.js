const { PrismaClientKnownRequestError } = require("@prisma/client")
const { createCustomerDb, updateCustomerDb } = require('../domains/customer.js')
const MissingFieldsError = require("../errors/missingFieldsError.js")
const NotFoundError = require("../errors/notFoundError.js")
const NotUniqueError = require("../errors/notUniqueError.js")

const createCustomer = async (req, res) => {
  const {
    name,
    phone,
    email
  } = req.body

  if (!name || !phone || !email) {
    throw new MissingFieldsError('Missing fields in request body')
  }

  try {
    const createdCustomer = await createCustomerDb(name, phone, email)

    res.status(201).json({ customer: createdCustomer })
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        throw new NotUniqueError("A customer with the provided email already exists" )
      }
    }
  }
}

async function updateCustomer(req, res) {
  const customerId = Number(req.params.id)
  const { name, contact } = req.body

  if (!name) {
    throw new MissingFieldsError('Missing fields in request body')
  }

  try {
    const updatedCustomer = await updateCustomerDb(customerId, name, contact)

    res.status(201).json({
      customer: updatedCustomer
    })
  } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === "P2025") {
          throw new NotFoundError('Customer with that id does not exist')
        }
      }
  }
}

module.exports = {
  createCustomer,
  updateCustomer
}
