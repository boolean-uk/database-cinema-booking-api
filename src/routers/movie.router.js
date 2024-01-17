const express = require("express");
const {
  getMovies,
  getMovieById,
} = require("../controllers/movie.controller.js");

const router = express.Router();

router.get("/", getMovies);
router.get("/:id", getMovieById);

module.exports = router;
