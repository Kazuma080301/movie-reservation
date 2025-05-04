const { z } = require("zod");

const showSchema = z.object({
  movieId: z.string().min(1, "movieId is required"),
  location: z.string().min(1, "location is required"),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "date must be in YYYY-MM-DD format")
    .transform((str) => new Date(str))
    .refine((d) => !isNaN(d.getTime()), "Invalid date"),
});

module.exports = { showSchema }