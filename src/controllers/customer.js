const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const createCustomer = async (req, res) => {
  const { name, phone, email } = req.body;

  if (!name || !phone || !email) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }

  /**
   * This will create a Customer AND create a new Contact, then automatically relate them with each other
   * @tutorial https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#create-a-related-record
   */
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
    // We add an `include` outside of the `data` object to make sure the new contact is returned in the result
    // This is like doing RETURNING in SQL
    include: {
      contact: true,
    },
  });

  res.status(201).json({ customer: createdCustomer });
};

const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { name, contact } = req.body;
  const { phone, email } = contact;

  if (!name) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }
  const customer = await prisma.customer.update({
    where: {
      id: Number(id),
    },
    data: {
      name,
      contact: {
        update: {
          phone,
          email,
        },
      },
    },
    include: {
      contact: true,
    },
  });
  res.status(201).json({ customer: customer });
};

module.exports = {
  createCustomer,
  updateCustomer,
};
