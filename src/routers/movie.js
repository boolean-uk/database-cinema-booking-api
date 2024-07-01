const express = require('express')

const router = express.Router()

const { getAllMovies, createdMovie, getMovieById } = require('../controllers/movie.js')

router.get('/', getAllMovies)
router.post('/', createdMovie)
router.get('/:id', getMovieById)
module.exports = router