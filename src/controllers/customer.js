const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");
const customerDomain = require("../domains/customer");

const createCustomer = async (req, res) => {
  const { name, phone, email } = req.body;

  if (!name || !phone || !email) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }

  try {
    const customer = await customerDomain.createCustomer(name, phone, email);
    res.status(201).json({ customer })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
            return res.status(409).json({ error: "A customer with the provided email already exists" })
        }
    }
  
    res.status(500).json({ error: e.message })
  }
};

const updateCustomer = async (req, res) => {
    const { name, contact } = req.body
    const { id } = req.params

    if (!name) {
        return res.status(400).json({
            error: "Missing fields in request body"
        })
    }

    try {
        const customer = await customerDomain.updateCustomer(name, contact, id)
        res.status(201).json({ customer })
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === "P2025") {
                return res.status(404).json({ error: "Customer with that id does not exist"})
            }
        }
    }
}

module.exports = {
  createCustomer,
  updateCustomer
};
