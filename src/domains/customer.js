const { customer } = require('../utils/prisma')

const getCustomerByIdDb = async (customerId) => {
  const foundCustomer = await customer.findFirst({
    where: {
      id: Number(customerId)
    }
  })

  return foundCustomer
}

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

module.exports = {
  getCustomerByIdDb,
  createCustomerDb,
  updateCustomerByIdDb
}
