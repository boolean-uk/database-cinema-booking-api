const express = require("express");
const {
  createCustomer,
  updateCustomer,
} = require("../controllers/customerCon");

const router = express.Router();

// In server.js, we told express that the /customer route should use this router file
// The below /register route extends that, so the end result will be a URL
// that looks like http://localhost:4040/customers/register
router.post("/register", createCustomer);
router.put("/:id", updateCustomer);

module.exports = router;
