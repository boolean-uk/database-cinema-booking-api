const express = require("express");
const {
  getMovies,
  createMovie,
  getMovieById
} = require('../controllers/movie');

const router = express.Router();


router.get("/", getMovies);
router.get("/:id", getMovieById);
router.post("/", createMovie);

module.exports = router;
