const express = require('express')
const { getAll, addMovie } = require('../controllers/movie.js')

const router = express.Router()

router.get('/', getAll)
router.post('/', addMovie)

module.exports = router