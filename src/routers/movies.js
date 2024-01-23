const express = require("express");
const router = express.Router();
const {
    getAllMovies, createAMovie, getAMovieById
  } = require('../controllers/movies');
router.get('/', getAllMovies)
router.post('/', createAMovie)
router.get('/:id',getAMovieById)
module.exports = router;