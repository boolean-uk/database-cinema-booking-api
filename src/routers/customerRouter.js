const express = require('express')
const router = express.Router()

// Controllers
const {
  createCustomer,
  updateCustomerById
} = require('../controllers/customer')

// Create a new customer
router.post('/register', createCustomer)

// Update a customer
router.put('/:id', updateCustomerById)

module.exports = router
