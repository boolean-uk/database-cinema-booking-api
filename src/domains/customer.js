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
const locateCustomerByIdDb = async (identifier) => {
  const identifiedCustomer = await prisma.customer.findUnique({
    where: {
      id: identifier,
    },
  });

  return identifiedCustomer;
};

const modifyCustomerByIdDb = async (requestPayload, identifier) => {
  const { newName, newContact } = requestPayload;

  const dataToModify = {};

  if (newName) {
    dataToModify.name = newName;
  }

  if (newContact) {
    dataToModify.contact = {
      update: {
        phoneNumber: newContact.phoneNumber,
        emailAddress: newContact.emailAddress,
      },
    };
  }

  const modifiedCustomer = await prisma.customer.update({
    where: { id: identifier },
    data: dataToModify,
    include: {
      contact: true,
    },
  });

  return modifiedCustomer;
};

module.exports = {
  createCustomerDb,
  locateCustomerByIdDb,
  modifyCustomerByIdDb,
};
