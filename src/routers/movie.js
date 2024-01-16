const express = require("express");
const {
  getMovies,
  createMovie,
  getMovieById,
} = require("../controllers/movie.js");

const router = express.Router();

router.get("/", getMovies);
router.post("/", createMovie);
router.get("/:id", getMovieById);

module.exports = router;
