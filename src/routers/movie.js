const express = require("express");
const { getAllMovies, createMovie, getMovieById, updateMovie, getMovieByIdOrTitle } = require("../controllers/movie");

const router = express.Router();

router.get('/', getAllMovies)
router.post('/', createMovie)
router.get('/:id', getMovieByIdOrTitle)
router.put('/:id', updateMovie)

module.exports = router;