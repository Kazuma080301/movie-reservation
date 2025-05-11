const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        genre: { type: [String], required: true }, // Array to support multiple genres
        actors: { type: [String], required: true }, // Array of actor names
        director: { type: String, required: true },
        releaseDate: { type: Date, required: true },
        duration: { type: Number, required: true }, // Duration in minutes
        language: { type: [String], required: true },
        description: { type: String },
        poster: { type: String }, // URL to the movie poster
        popularity: { type: Number, default: 0 }, // Popularity Score
        rating: { type: Number, default: 0 }, // Average rating
    }, { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;