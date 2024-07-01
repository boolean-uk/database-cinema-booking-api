const express = require('express')
const { getAll, addMovie, findByID, updateMovieByID } = require('../controllers/movie.js')

const router = express.Router()

router.get('/', getAll)
router.post('/', addMovie)
router.get('/:id', findByID)
router.put('/:id', updateMovieByID)

module.exports = router