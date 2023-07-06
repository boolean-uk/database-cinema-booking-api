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

module.exports = {
  createNewCustomer,
};
