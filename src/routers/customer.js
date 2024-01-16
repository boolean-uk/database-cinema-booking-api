const express = require("express");
const { createCustomer } = require("../controllers/customer");
const validate = require("../middleware/zod/customer.js");

const router = express.Router();

router.post("/register", validate.createCustomer, createCustomer);

module.exports = router;
