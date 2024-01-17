const express = require('express')
const router = express.Router()

const { 
  getAllMovies,
  createMovie,
  getMovieById
} = require('../controllers/movie')

router.get('/', getAllMovies)
router.get('/:id', getMovieById)
router.post('/', createMovie)

module.exports = router