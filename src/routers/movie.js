const express = require("express");
const {
  getAllMovies,
  getMovieByID,
  createMovie,
  updateMovie
} = require('../controllers/movie');

const router = express.Router()

router.get('/', getAllMovies)
router.get('/:id', getMovieByID)
router.post('/', createMovie)
router.put('/:id', updateMovie)

module.exports = router