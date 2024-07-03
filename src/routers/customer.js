const express = require("express");
const {
  createCustomer,
  updateCustomerById
} = require('../controllers/customer');

const router = express.Router();


router.post("/register", createCustomer);
router.put("/:id", updateCustomerById)


module.exports = router;
