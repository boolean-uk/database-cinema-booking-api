const { customer } = require('../utils/prisma')

/**
 * This will create a Customer AND create a new Contact, then automatically relate them with each other
 * @tutorial https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#create-a-related-record
 */

const createCustomerDb = async (name, phone, email) => {
  const createdCustomer = await customer.create({
    data: {
      name,
      contact: {
        create: {
          phone,
          email
        }
      }
    },
    include: {
      contact: true
    }
  })

  return createdCustomer
}

const updateCustomerByIdDb = async (newName, customerId) => {
  const updatedCustomer = await customer.update({
    where: {
      id: Number(customerId)
    },
    data: {
      name: newName
    },
    include: {
      contact: true
    }
  })

  return updatedCustomer
}

module.exports = {
  createCustomerDb,
  updateCustomerByIdDb
}
