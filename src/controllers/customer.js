const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const createCustomer = async (req, res) => {
  console.log("hi tom");
  const { name, phone, email } = req.body;

  if (!name || !phone || !email) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }

  try {
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

const getAllCustomers = async (req, res) => {
  const customers = await prisma.customer.findMany({
    include: {
      contact: true,
    },
  });

  res.status(200).json({
    customers,
  });
  console.log("gettin customers");
};

const updateCustomer = async (req, res) => {
  console.log("updating customer");
  const customerId = parseInt(req.params.id);
  const { name } = req.body;

  if (!customerId) {
    return res.status(400).json({
      error: "ID does not exist",
    });
  }

  const foundCustomer = await prisma.movie.update({
    where: {
      id: customerId,
    },
    data: {
      name
    },
    include: {
      contact: true,
    },
  });
  res.status(201).json({
    foundCustomer,
  });
};

module.exports = {
  createCustomer,
  updateCustomer,
  getAllCustomers,
};
