const express = require("express");
const movieController = require("../controllers/movie.js");

const router = express.Router();

router.get("/movies", movieController.getMovies);

module.exports = router;
