const express = require('express')

const router = express.Router()

const { getAllMovies, createdMovie } = require('../controllers/movie.js')

router.get('/', getAllMovies)
router.post('/', createdMovie)

module.exports = router