const express = require("express");
const {
  createCustomer,
  updateCustomer,
} = require("../controllers/customer.controller.js");
const { validateBody } = require("../middleware/zod/validate.js");
const {
  newCustomerSchema,
  updateCustomerSchema,
} = require("../middleware/zod/customer.js");

const router = express.Router();

router.post("/register", validateBody(newCustomerSchema), createCustomer);
router.put("/:id", validateBody(updateCustomerSchema), updateCustomer);

module.exports = router;
