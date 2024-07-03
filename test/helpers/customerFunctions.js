
const prisma = require("../../src/utils/prisma")

const createCustomer = async (name, phone, email) => {
  return await prisma.customer.create({
    data: {
      name: name,
      contact: {
        create: {
          phone: phone,
          email: email,
        },
      },
    },
  })
}

const updateCustomer = async (id, name, phone, email) => {
  return await prisma.customer.update({
    where: { id },
    data: {
      name,
      contact: {
        update: {
          phone,
          email,
        },
      },
    },
    include: {
      contact: true,
    },
  })
}

module.exports = {
  createCustomer,
  updateCustomer
}