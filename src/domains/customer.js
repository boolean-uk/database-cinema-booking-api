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

const findCustomerByIdDb = async (id) => {
  const foundCustomer = await prisma.customer.findUnique({
    where: {
      id: id,
    },
  });

  return foundCustomer;
};

const updateCustomerByIdDb = async (request_body, id) => {
  const { name, contact } = request_body;

  let dataToUpdate = {};

  if (name) {
    dataToUpdate.name = name;
  }

  if (contact) {
    dataToUpdate.contact = {
      phone: contact.phone,
      email: contact.email,
    };
  }

  const updatedCustomer = await prisma.customer.update({
    where: { id: id },
    data: dataToUpdate,
  });

  return updatedCustomer;
};

module.exports = {
  createCustomerDb,
  findCustomerByIdDb,
  updateCustomerByIdDb,
};
