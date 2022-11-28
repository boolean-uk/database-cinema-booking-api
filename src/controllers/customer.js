const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const createCustomer = async (req, res) => {
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
    include: { contact: true }
    })
    res.status(201).json({customer: updatedCustomer})
  } catch (e) {
    res.status(500).json({ error: e.message });
  }

};

module.exports = {
  createCustomer,
  updateCustomer
};
