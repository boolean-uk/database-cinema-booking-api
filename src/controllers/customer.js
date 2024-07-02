const {
  createCustomerDb,
  updateCostumerDb,
} = require("../domains/customer.js")

const createCustomer = async (req, res) => {
  const { name, phone, email } = req.body
  const customer = await createCustomerDb(name, phone, email)

  res.status(201).json({
    customer,
  })
}

const updateCostumer = async (req, res) => {
  const paramsId = Number(req.params.id)
  const { name, contact } = req.body
  const customer = await updateCostumerDb(paramsId, name, contact)

  res.status(201).json({
    customer,
  })
}

module.exports = {
  createCustomer,
  updateCostumer,
}
