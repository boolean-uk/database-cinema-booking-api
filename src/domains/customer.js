const prisma = require("../utils/prisma");

/**
 * This will create a Customer AND create a new Contact, then automatically relate them with each other
 * @tutorial https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#create-a-related-record
 */
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
    // We add an `include` outside of the `data` object to make sure the new contact is returned in the result
    // This is like doing RETURNING in SQL
    include: {
      contact: true,
    },
  });

const updateCustomerDB = async (id, data) =>
  await prisma.customer.updateMany({
    where: {
      id: Number(id),
    },
    data: { name: data.name, contact: data.contact },
    include: {
      contact: true,
    },
  });

const findCustomerDB = async (id) =>
  await prisma.customer.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      contact: true,
    },
  });

module.exports = {
  createCustomerDb,
  updateCustomerDB,
  findCustomerDB,
};
