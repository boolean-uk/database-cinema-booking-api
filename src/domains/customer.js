const prisma = require('../utils/prisma')

/**
 * This will create a Customer AND create a new Contact, then automatically relate them with each other
 * @tutorial https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#create-a-related-record
 */

const createCustomerDb = async (name, phone, email) =>
  await prisma.customer.create({
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

module.exports = {
  createCustomerDb
}
