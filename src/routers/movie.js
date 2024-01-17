const express = require("express");
const {
  getMovies,
  createMovie,
  getMovieById,
  updateMovie,
} = require("../controllers/movie.js");

const router = express.Router();

router.get("/", getMovies);
router.post("/", createMovie);
router.get("/:id", getMovieById);
router.put("/:id", updateMovie);

module.exports = router;
