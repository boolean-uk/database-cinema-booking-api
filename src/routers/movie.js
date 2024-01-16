const express = require("express")
const router = express.Router()

const { getMovieList } = require('../controllers/movie.js')

// GET LIST OF MOVIES
router.get('/', getMovieList)

module.exports = router