const express = require("express")
const router = express.Router()

const { getMovieList, createMovie, getMovieById } = require('../controllers/movie.js')

// GET LIST OF MOVIES
router.get('/', getMovieList)

// CREATE A MOVIE
router.post('/', createMovie)

// GET MOVIE BY ID
router.get('/:id', getMovieById)

module.exports = router