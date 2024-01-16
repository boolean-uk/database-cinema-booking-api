const { createCustomerDb } = require("../domains/customer.js");

const Types = require("../utils/types.d.js");
const handleError = require("../utils/error.js");

/**
 * @param {Types.Request} req
 * @param {Types.Response} res
 * @returns {Promise<void>}
 */
async function createCustomer(req, res) {
  const { name, phone, email } = req.body;

  try {
    const createdCustomer = await createCustomerDb(name, phone, email);
    res.status(201).json({ customer: createdCustomer });
  } catch (error) {
    handleError(error, res);
  }
}

module.exports = {
  createCustomer,
};
