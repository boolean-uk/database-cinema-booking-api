const {
  Prisma: { PrismaClientKnownRequestError },
} = require("@prisma/client");
const { createCustomerDb } = require("../domains/customer.js");

const Types = require("../utils/types.d.js");

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
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        res
          .status(409)
          .json({ error: "A customer with the provided email already exists" });
        return;
      }
    }

    res.status(500).json({ error: e.message });
  }
}

module.exports = {
  createCustomer,
};
