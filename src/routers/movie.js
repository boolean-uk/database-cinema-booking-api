const express = require("express");
const { getAllMovies } = require("../controllers/movie.js");

const router = express.Router();

router.get("/movies", getAllMovies);

module.exports = router;
