const { z } = require("zod");

const newCustomerSchema = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.string(),
});

const updateContactSchema = z.object({
  phone: z.string(),
  email: z.string(),
});

const updateCustomerSchema = z.object({
  name: z.string(),
  contact: updateContactSchema.optional(),
});

module.exports = {
  newCustomerSchema,
  updateCustomerSchema,
};
