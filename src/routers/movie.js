const express = require("express");
const {
  fetchMovies,
  generateMovie,
  fetchMovieById,
} = require("../controllers/movie.js");

const router = express.Router();

router.get("/", fetchMovies);
router.post("/", generateMovie);
router.get("/:id", fetchMovieById);

module.exports = router;
