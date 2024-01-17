const express = require('express')
const router = express.Router()

// Controllers
const {
  getAllMovies,
  createMovie,
  getMovieById,
  updateMovieById
} = require('../controllers/movies')

// Retrieve a list of movies
router.get('/', getAllMovies)

// Create a movie
router.post('/', createMovie)

// Retrieve a movie by ID
router.get('/:id', getMovieById)

// Update a movie
router.put('/:id', updateMovieById)

module.exports = router
