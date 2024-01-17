const express = require("express");
const theMovieController = require("../controllers/movie.js");

const router = express.Router();

router.get("/movies", theMovieController.fetchMovies);

module.exports = router;
