const express = require("express");
const movieSchema = require('./movie.validator');
const { validateSchema } = require('../../middlewares/validateMiddleware')
const { protect, authorize } = require("../auth/auth.middleware");
const { getMovies, getMovieById, addMovie, updateMovie, deleteMovie } = require('./movie.controller')

const router = express.Router();

router.get("/", getMovies);

router.get("/:id", getMovieById);

router.post("/", protect, authorize("Admin"), validateSchema(movieSchema), addMovie);

router.put("/:id", protect, authorize("Admin"), validateSchema(movieSchema), updateMovie);

router.delete("/:id", protect, authorize("Admin"), deleteMovie);

module.exports = router;

