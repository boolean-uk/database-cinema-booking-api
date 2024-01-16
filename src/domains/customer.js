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
    // We add an `include` outside of the `data` object to make sure the new contact is returned in the result
    // This is like doing RETURNING in SQL
    include: {
      contact: true,
    },
  });
}

module.exports = {
  createCustomerDb,
};
