const prisma = require("../utils/prisma")

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

const updateCostumerDb = async (id, name) =>
  await prisma.customer.update({
    where: {
      id: id
    },
    data: {
      name: name
    },
    include: {
      contact: true
    }
  })

module.exports = {
  createCustomerDb,
  updateCostumerDb
}
