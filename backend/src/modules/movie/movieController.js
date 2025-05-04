const Movie = require("./Movie");

const getMovies = async (req, res) => {
    try {
        const { title, genre, actor, director, releaseYear } = req.query;
        let query = {};

        if (title) query.title = new RegExp(title, "i"); // Case-insensitive search
        if (genre) query.genre = new RegExp(genre, "i");
        if (actor) query.actors = new RegExp(actor, "i");
        if (director) query.director = new RegExp(director, "i");
        if (releaseYear) query.releaseYear = Number(releaseYear);

        const movies = await Movie.find(query);
        res.json({ count: movies.length, movies });
    } catch (error) {
        res.status(500).json({ message: "Error fetching movies", error });
    }
};

const getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ message: "Movie not found" });

        res.json(movie);
    } catch (error) {
        res.status(500).json({ message: "Error fetching movie details", error });
    }
};

const addMovie = async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        const savedMovie = await newMovie.save();
        res.status(201).json({ message: "Movie added successfully", movie: savedMovie });
    } catch (error) {
        res.status(500).json({ message: "Error adding movie", error });
    }
};

const updateMovie = async (req, res) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMovie) return res.status(404).json({ message: "Movie not found" });

        res.json({ message: "Movie updated successfully", movie: updatedMovie });
    } catch (error) {
        res.status(500).json({ message: "Error updating movie", error });
    }
};

const deleteMovie = async (req, res) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
        if (!deletedMovie) return res.status(404).json({ message: "Movie not found" });

        res.json({ message: "Movie deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting movie", error });
    }
};

module.exports = { getMovies, getMovieById, addMovie, updateMovie, deleteMovie };