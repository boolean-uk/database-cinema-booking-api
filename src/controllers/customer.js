const {
  createCustomerDb,
  updateCustomerNameDb,
  updateCustomerContactDb,
} = require("../domains/customer.js");

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

/**
 * @param {Types.Request} req
 * @param {Types.Response} res
 * @returns {Promise<void>}
 */
async function updateCustomer(req, res) {
  const { name, contact } = req.body;
  const id = Number(req.params.id);

  let updatedCustomer;
  try {
    if (contact) {
      const { phone, email } = contact;
      updatedCustomer = await updateCustomerContactDb(id, name, phone, email);
    }
    if (!contact) updatedCustomer = await updateCustomerNameDb(id, name);
  } catch (error) {
    handleError(error, res);
  }

  res.status(201).json({ customer: updatedCustomer });
}

module.exports = {
  createCustomer,
  updateCustomer
};
