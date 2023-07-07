const prisma = require("../utils/prisma");

async function createNewCustomer(name, phone, email) {
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
    include: {
      contact: true,
    },
  });
  console.log("createdCustomer", createdCustomer);
  return { customer: createdCustomer };
}

async function updateCustomerById(givenId, givenName) {
  const id = Number(givenId);
  const updatedCustomer = await prisma.customer.update({
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
  console.log("updatedCustomer", updatedCustomer);
  return updatedCustomer;
}

module.exports = {
  createNewCustomer,
  updateCustomerById,
};
