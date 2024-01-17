const express = require("express");
const {
  createCustomer,
  updateCustomer,
} = require("../controllers/customer.controller.js");
const validate = require("../middleware/zod/customer.js");

const router = express.Router();

router.post("/register", validate.createCustomer, createCustomer);
router.put("/:id", validate.updateCustomer, updateCustomer);

module.exports = router;
