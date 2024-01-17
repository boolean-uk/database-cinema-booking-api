const { z } = require("zod");

const newScreenSchema = z.object({
  number: z.number(),
  screenings: z
    .object({
      movieId: z.number(),
      startsAt: z.string(),
    })
    .array()
    .optional(),
});

module.exports = { newScreenSchema };
