const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const { MissingFieldsError } = require('../utils/errors')

const createCustomer = async (req, res) => {
  const { name, phone, email } = req.body;

  if (!name || !phone || !email) {
    throw new MissingFieldsError()
  }

  const createdCustomer = await prisma.customer.create({
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

  res.status(201).json({ customer: createdCustomer });
};

const updateCustomer = async (req, res) => {
  const { name } = req.body;
  const customerId = Number(req.params.id);

  if (!name) {
    return res.status(400).json({
      error: "Missing name in request body",
    });
  }

  try {
    const updatedCustomer = await prisma.customer.update({
      where: { id: customerId },
      data: { name: name },
      include: { contact: true },
    });
    res.status(201).json({ customer: updatedCustomer });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  createCustomer,
  updateCustomer,
};
