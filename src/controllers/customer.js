const { Prisma } = require("@prisma/client");
const { createNewCustomer, updateCustomerById } = require("../domains/customer");

const createCustomer = async (req, res) => {
  const { name, phone, email } = req.body;
  if (!name || !phone || !email) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }
  try {
    const createdCustomer = await createNewCustomer(name, phone, email);
    res.status(201).json({ customer: createdCustomer });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res
          .status(409)
          .json({ error: "A customer with the provided email already exists" });
      }
    }
    res.status(500).json({ error: e.message });
  }
};

const updateCustomer = async (req, res) => {
  const { name } = req.body
  if (!name) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }
  try {
    const { id } = req.params
    const updatedCustomer = await updateCustomerById(id, name)
    res.status(201).json({ customer: updatedCustomer})
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res
          .status(409)
          .json({ error: "A customer with the provided email already exists" });
      }
    }
    res.status(500).json({ error: e.message });
  }
}

module.exports = {
  createCustomer,
  updateCustomer
};
