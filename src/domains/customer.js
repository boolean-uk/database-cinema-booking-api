const prisma = require("../utils/prisma");

const Types = require("../utils/types.d");

/**
 * @param {String} name
 * @param {String} phone
 * @param {String} email
 * @returns {Promise<Types.Customer>}
 */
async function createCustomerDb(name, phone, email) {
  return await prisma.customer.create({
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
}

/**
 * @param {Number} id
 * @param {String} name
 * @returns {Promise<Types.Customer>}
 */
async function updateCustomerNameDb(id, name) {
  return prisma.customer.update({
    where: {
      id: id,
    },
    data: {
      name: name,
    },
    include: {
      contact: true,
    },
  });
}

/**
 * @param {Number} id
 * @param {String} name
 * @param {String} phone
 * @param {String} email
 * @returns {Promise<Types.Customer>}
 */
async function updateCustomerContactDb(id, name, phone, email) {
  return prisma.customer.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      contact: {
        update: {
          phone: phone,
          email: email,
        },
      },
    },
    include: {
      contact: true,
    },
  });
}

module.exports = {
  createCustomerDb,
  updateCustomerNameDb,
  updateCustomerContactDb,
};
