const express = require("express");
const movieSchema = require('../validators/movieValidator');
const { validateSchema } = require('../middlewares/validateMiddleware')
const { protect, authorize } = require("../middlewares/authMiddleware");
const { getMovies, getMovieById, addMovie, updateMovie, deleteMovie } = require('../controllers/movieController')

const router = express.Router();

router.get("/", getMovies);

router.get("/:id", getMovieById);

router.post("/", protect, authorize("Admin"), validateSchema(movieSchema), addMovie);

router.put("/:id", protect, authorize("Admin"), validateSchema(movieSchema), updateMovie);

router.delete("/:id", protect, authorize("Admin"), deleteMovie);

module.exports = router;