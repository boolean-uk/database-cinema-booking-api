const express = require("express");
const {
  getAllCustomers,
  createCustomer,
  updateCustomerName
} = require('../controllers/customer');

const router = express.Router();

router.get("/", getAllCustomers)
router.post("/register", createCustomer);
router.put('/:id', updateCustomerName);


module.exports = router;
