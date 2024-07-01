const express = require('express')

const router = express.Router()

const { getAllMovies } = require('../controllers/movie.js')

router.get('/', getAllMovies)

module.exports = router