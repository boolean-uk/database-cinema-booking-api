const express = require("express");
const {
  createCustomer
} = require('../controllers/customer');
const validate = require("../middleware/zod/customer.js")

const router = express.Router();

// In index.js, we told express that the /customer route should use this router file
// The below /register route extends that, so the end result will be a URL
// that looks like http://localhost:4040/customer/register
router.post("/register", validate.createCustomer, createCustomer);

module.exports = router;
