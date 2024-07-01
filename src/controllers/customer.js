const { PrismaClientKnownRequestError } = require("@prisma/client")
const { createCustomerDb, updateCostumerDb } = require("../domains/customer.js")

const createCustomer = async (req, res) => {
  const { name, phone, email } = req.body

  if (!name || !phone || !email) {
    return res.status(400).json({
      error: "Missing fields in request body"
    })
  }

  try {
    const createdCustomer = await createCustomerDb(name, phone, email)

    res.status(201).json({ customer: createdCustomer })
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res
          .status(409)
          .json({ error: "A customer with the provided email already exists" })
      }
    }

    res.status(500).json({ error: e.message })
  }
}

const updateCostumer = async (req, res) => {
  const id = Number(req.params.id)
  const { name } = req.body
  const customer = await updateCostumerDb(id, name)
  
  res.status(201).json({
    customer: customer
  })
}

module.exports = {
  createCustomer,
  updateCostumer
}
