const { z } = require("zod");

const newMovieSchema = z.object({
  title: z.string(),
  runtimeMins: z.number(),
  screenings: z
    .object({
      screenId: z.number(),
      startsAt: z.string(),
    })
    .array()
    .optional(),
});

module.exports = {
  newMovieSchema,
};
