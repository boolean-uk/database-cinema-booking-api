const express = require('express')
const { getMovies, createMovie, getAMovie, updateAMovie } = require('../controllers/movies')

const router = express.Router()

router.get("/", getMovies)
router.post("/", createMovie)
router.get("/:id", getAMovie)
router.put("/:id", updateAMovie)

module.exports = router
