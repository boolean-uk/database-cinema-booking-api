const express = require("express");
const router = express.Router();
const {
    getAllMovies, createAMovie, getAMovieById, updateMoviebyId
  } = require('../controllers/movies');
router.get('/', getAllMovies)
router.post('/', createAMovie)
router.get('/:id',getAMovieById)
router.put('/:id',updateMoviebyId)
module.exports = router;