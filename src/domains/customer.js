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

const updateCustomerByIdDb = async (fields, customerId) => {
  const updatedCustomer = await customer.update({
    where: {
      id: Number(customerId)
    },
    data: {
      name: fields.name,
      ...(fields.contact && {
        contact: {
          update: {
            where: {
              customerId: Number(customerId)
            },
            data: fields.contact
          }
        }
      })
    },
    include: {
      contact: true
    }
  })

  return updatedCustomer
}

const getCustomerByIdDb = async (customerId) => {
  const foundCustomer = await customer.findFirst({
    where: {
      id: Number(customerId)
    }
  })

  return foundCustomer
}

module.exports = {
  createCustomerDb,
  updateCustomerByIdDb,
  getCustomerByIdDb
}
