const express = require('express')
const router = express.Router()

// Controllers
const { getAllMovies } = require('../controllers/movies')

// Retrieve a list of movies
router.get('/', getAllMovies)

module.exports = router
