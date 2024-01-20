const express = require("express");
const { getAllMovies, createMovie } = require("../controllers/movie.js");

const router = express.Router();

router.get("/movies", getAllMovies);
router.posts("/movies", createMovie)
module.exports = router;
