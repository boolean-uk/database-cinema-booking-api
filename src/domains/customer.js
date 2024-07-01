const prisma = require('../utils/prisma')


const createCustomerDb = async (name, phone, email) => await prisma.customer.create({
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

async function updateCustomerByIdDb(customerId, newProps) {

  const customer = await prisma.customer.update({
    where: {
      id: customerId
    },
    data: { ...newProps,
      contact: newProps.contact ? {
        update: newProps.contact } : undefined,
      },
    include: {
      contact: true
    }
  })
  return customer
}



module.exports = {
  createCustomerDb,
  updateCustomerByIdDb
}
