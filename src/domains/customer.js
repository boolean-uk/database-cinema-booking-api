const prisma = require("../utils/prisma");

const createCustomerDb = async (name, phone, email) =>
  await prisma.customer.create({
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

  const updateCustomerDb = async (id, newName) => {
    return await prisma.customer.update({
      where: {
        id: Number(id),
      },
      data: {
        name: newName,
      },
      include: {
        contact: true,
      },
    });
  };
  
  module.exports = {
    createCustomerDb,
    updateCustomerDb,
  };