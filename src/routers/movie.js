const express = require("express");
const {
  fetchMovies,
  generateMovie,
  fetchMovieById,
  updateTheMovie,
} = require("../controllers/movie.js");

const router = express.Router();

router.get("/", fetchMovies);
router.post("/", generateMovie);
router.get("/:id", fetchMovieById);
router.put("/:id", updateTheMovie);

module.exports = router;
