const express = require('express')

const router = express.Router()

const { getAllMovies, createdMovie, getMovieById, updateMovie } = require('../controllers/movie.js')

router.get('/', getAllMovies)
router.post('/', createdMovie)
router.get('/:id', getMovieById)
router.put('/:id', updateMovie)
module.exports = router