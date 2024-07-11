const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createCustomerDb = async (name, phone, email) => {
  return prisma.customer.create({
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
  });
};

const updateCustomerDb = async (id, data) => {
  const updateData = {};

  if (data.name) updateData.name = data.name;
  if (data.phone || data.email) {
    updateData.contact = {
      update: {}
    };

    if (data.phone) updateData.contact.update.phone = data.phone;
    if (data.email) updateData.contact.update.email = data.email;
  }

  return prisma.customer.update({
    where: { id: Number(id) },
    data: updateData,
    include: {
      contact: true
    }
  });
};

module.exports = {
  createCustomerDb,
  updateCustomerDb
};
