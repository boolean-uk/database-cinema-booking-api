const express = require("express")
const {
  createCustomer,
  updateCustomerById,
} = require("../controllers/customer")

const router = express.Router()
// that looks like http://localhost:4040/customer/register
router.post("/register", createCustomer)
router.put("/:id", updateCustomerById)
module.exports = router
