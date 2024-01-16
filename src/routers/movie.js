const express = require("express")
const router = express.Router()

const { getMovieList, createMovie } = require('../controllers/movie.js')

// GET LIST OF MOVIES
router.get('/', getMovieList)

// CREATE A MOVIE
router.post('/', createMovie)

module.exports = router