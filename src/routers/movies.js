const express = require('express')
const { getMovies, createMovie } = require('../controllers/movies')

const router = express.Router()

router.get("/", getMovies)
router.post("/", createMovie)

module.exports = router
