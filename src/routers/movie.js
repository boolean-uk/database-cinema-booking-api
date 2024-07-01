const express = require('express')
const { getAll, addMovie, findByID } = require('../controllers/movie.js')

const router = express.Router()

router.get('/', getAll)
router.post('/', addMovie)
router.get('/:id', findByID)

module.exports = router