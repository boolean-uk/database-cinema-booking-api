const { Prisma } = require("@prisma/client")
const prisma = require('../utils/prisma')

const createCustomer = async (req, res) => {
    const {
        name,
        phone,
        email
    } = req.body

    if (!name || !phone || !email) {
        return res.status(400).json({
            error: "Missing fields in request body"
        })
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
                        email
                    }
                }
            },
            // We add an `include` outside of the `data` object to make sure the new contact is returned in the result
            // This is like doing RETURNING in SQL
            include: { 
                contact: true
            }
        })

        res.status(201).json({ customer: createdCustomer })
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === "P2002") {
                return res.status(409).json({ error: "A customer with the provided email already exists" })
            }
        }
        
        res.status(500).json({ error: e.message })
    }
}

const updateCustomer = async (req, res) => {
    const { id } = req.params;
    const { name, contact } = req.body;
  
    if (!name && !contact) {
      return res.status(400).json({ error: "Missing fields in request body" });
    }
  
    try {
      const updatedCustomer = await prisma.customer.update({
        where: { id: parseInt(id) },
        data: {
          name,
          contact: contact ? { update: contact } : undefined,
        },
        include: { contact: true },
      });
  
      if (!updatedCustomer) {
        return res.status(404).json({ error: "Customer with that id does not exist" });
      }
  
      res.status(201).json({ customer: updatedCustomer });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2025") {
          return res.status(404).json({ error: "Customer with that id does not exist" });
        }
      }
  
      res.status(500).json({ error: e.message });
    }
  };
  
  module.exports = {
    createCustomer,
    updateCustomer,
  };
  