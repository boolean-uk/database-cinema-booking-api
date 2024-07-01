const express = require("express");
const { getAllMovies, createMovie, getMovieById } = require("../controllers/movie");

const router = express.Router();

router.get('/', getAllMovies)
router.post('/', createMovie)
router.get('/:id', getMovieById)

module.exports = router;