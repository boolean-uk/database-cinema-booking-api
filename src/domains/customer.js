// The domain should just handle the query to the DB, and send back either the data or an error to the controller. The controller then sends the data/error back to the client.

/**
 * This will create a Customer AND create a new Contact, then automatically relate them with each other
 * @tutorial https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#create-a-related-record
 */
const prisma = require("../utils/prisma");

async function createNewCustomer() {
  const createdCustomer = await prisma.customer.create({
    data: {
      name,
      contact: {
        create: {
          phone,
          email,
        },
      },
    },
    // We add an `include` outside of the `data` object to make sure the new contact is returned in the result
    // This is like doing RETURNING in SQL
    include: {
      contact: true,
    },
  })
  return { customer: createdCustomer}
}

module.exports = {
  createNewCustomer
}