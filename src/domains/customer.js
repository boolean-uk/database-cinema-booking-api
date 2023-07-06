const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const createCustomer = async (name, phone, email) => {
  const customer = await prisma.customer.create({
    data: {
      name,
      contact: {
        create: {
          phone,
          email,
        },
      },
    },
    include: {
      contact: true,
    },
  });
  return customer
};

const updateCustomer = async (name, id) => {
  const customer = await prisma.customer.update({
    where: { id: Number(id)},
    data: { name: name},
    include: {
      contact: true
    }
  })
  return customer
}

module.exports = {
  createCustomer,
  updateCustomer
};
