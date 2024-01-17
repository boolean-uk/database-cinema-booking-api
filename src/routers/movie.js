const express = require('express')
const router = express.Router()

const { getAllMovies } = require('../controllers/movie')

router.get('/', getAllMovies)

module.exports = router