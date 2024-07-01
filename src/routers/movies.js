const express = require("express");
const router = express.Router()
const {
  getMovies,
  createMovie,
  getMovieById,
  updateMovieById
} = require('../controllers/movies');

router.get("/", getMovies)
router.post("/", createMovie)
router.get("/:id", getMovieById)
router.put("/:id", updateMovieById)


module.exports = router;
