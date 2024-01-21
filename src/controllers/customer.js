const { PrismaClientKnownRequestError } = require("@prisma/client");
const {
  createCustomerDb,
  modifyCustomerByIdDb,
  locateCustomerByIdDb,
} = require("../domains/customer.js");

const createCustomer = async (req, res) => {
  const { name, phone, email } = req.body;

  if (!name || !phone || !email) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }
  try {
    const createdCustomer = await createCustomerDb(name, phone, email);

    res.status(201).json({ customer: createdCustomer });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res
          .status(409)
          .json({ error: "A customer with the provided email already exists" });
      }
    }

    res.status(500).json({ error: e.message });
  }
};

const updateCustomerById = async (req, res) => {
  const id = Number(req.params.id);
  const { name, contact } = req.body;
  const customer = await locateCustomerByIdDb(id);

  try {
    if (!name && !contact) {
      return res.status(400).send({ error: "Missing fields in request body" });
    }

    if (!customer) {
      return res.status(404).send({ error: "No customer with provided ID" });
    }

    const updatedCustomer = await modifyCustomerByIdDb(req.body, id);

    return res.status(201).send({ customer: updatedCustomer });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ error: e.message });
  }
};

module.exports = {
  createCustomer,
  updateCustomerById,
};
