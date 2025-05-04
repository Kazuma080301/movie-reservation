const z = require("zod");

const movieSchema = z.object({
    title: z.string().min(2).max(100),
    genre: z.array(z.string().min(2)).min(1),
    actors: z.array(z.string().min(2)).min(1),
    director: z.string().min(2),
    releaseDate: z.coerce.date(), // converts string to Date
    duration: z.number().positive(),
    language: z.string(),
    description: z.string().min(10),
    popularity: z.number().min(0).optional(),
    rating: z.number().min(0).max(10).optional()
});

module.exports = { movieSchema };
