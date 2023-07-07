const prisma = require("../utils/prisma");

async function createNewCustomer(name, phone, email) {
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
  return {customer};
}

async function updateCustomerById(givenId, givenName) {
  const id = Number(givenId);
  const customer = await prisma.customer.update({
    where: {
      id: id,
    },
    data: {
      name: givenName,
    },
    include: {
      contact: true,
    },
  });
  return {customer};
}

module.exports = {
  createNewCustomer,
  updateCustomerById,
};
