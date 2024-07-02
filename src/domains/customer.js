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

async function updateCustomerDb(customerId, name, contact) {
  const customerData = {
    where: {
      id: customerId
    },
    data: {
      name: name
    }, 
    include: {
      contact: true
    }
  }

  if(contact) {
    customerData.data.contact = {
      update: {
        phone: contact.phone,
        email: contact.email
      }
    }
  }

  return await prisma.customer.update(customerData)
} 

module.exports = {
  createCustomerDb,
  updateCustomerDb
}
