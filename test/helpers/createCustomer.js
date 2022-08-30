const prisma = require('../../src/utils/prisma');

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
  });
};

module.exports = {
  createCustomer,
};
