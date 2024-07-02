const express = require("express")
const {
  createCustomer,
  updateCostumer
} = require('../controllers/customer')
const router = express.Router()

router.post("/register", createCustomer)
router.put("/:id", updateCostumer)

module.exports = router
