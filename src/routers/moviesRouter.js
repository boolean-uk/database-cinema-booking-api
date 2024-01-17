const express = require('express')
const router = express.Router()

// Controllers
const {
  getAllMovies,
  createMovie,
  getMovieById
} = require('../controllers/movies')

// Retrieve a list of movies
router.get('/', getAllMovies)

// Create a movie
router.post('/', createMovie)

// Retrieve a movie by ID
router.get('/:id', getMovieById)

module.exports = router
