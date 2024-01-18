const { z } = require("zod");

const newTicketSchema = z.object({
  screeningId: z.number(),
  customerId: z.number(),
});

module.exports = {
  newTicketSchema,
};
