const express = require('express')
const router = express.Router()

// Controllers
const { getAllMovies, createMovie } = require('../controllers/movies')

// Retrieve a list of movies
router.get('/', getAllMovies)

// Create a movie
router.post('/', createMovie)

module.exports = router
