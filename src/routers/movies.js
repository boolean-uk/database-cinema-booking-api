const express = require("express");
const router = express.Router()
const {
  getMovies,
  createMovie,
  getMovieById
} = require('../controllers/movies');

router.get("/", getMovies)
router.post("/", createMovie)
router.get("/:id", getMovieById)


module.exports = router;
