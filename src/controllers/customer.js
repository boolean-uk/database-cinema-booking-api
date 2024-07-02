const { PrismaClientKnownRequestError } = require("@prisma/client");
const {
  createCustomerDb,
  updateCustomerByIdDb,
} = require("../domains/customer.js");
const { DataNotFoundError, MissingFieldsError } = require("../errors/errors.js");

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

async function updateCustomerById(req, res) {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    throw new DataNotFoundError('No customer found with that ID')
  }

  const newProps = req.body;
  if (!newProps.name) {
    throw new MissingFieldsError('Customers require a name')
  }

  try {
  const customer = await updateCustomerByIdDb(id, newProps);
  res.status(201).json({ customer });
  } catch (e) {
    if (e.code === 'P2025') {
      return res.status(404).json({ error: e.message })
    }
  }
}

module.exports = {
  createCustomer,
  updateCustomerById,
};



    // Prisma error codes: https://www.prisma.io/docs/orm/reference/error-reference#common
    // HTTP error codes: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses