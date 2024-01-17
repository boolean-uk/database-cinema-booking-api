const express = require("express");
const theMovieController = require("../controllers/movie.js");

const router = express.Router();

router.get("/movies", theMovieController.fetchMovies);
router.post("/movies", theMovieController.generateMovie);

module.exports = router;
