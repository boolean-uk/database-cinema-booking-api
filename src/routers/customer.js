const express = require("express");
const { createCustomer, updateCustomer } = require("../controllers/customer");

const router = express.Router();

// In index.js, we told express that the /customers route should use this router file
// The below /register route extends that, so the end result will be a URL
// that looks like http://localhost:4000/customers/register
router.post("/register", createCustomer);
router.put("/", updateCustomer);

module.exports = router;
