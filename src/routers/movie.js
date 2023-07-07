const express = require('express')
const router = express.Router()
const {
	getMovieList,
	createMovie,
	getById,
	updateMovie,
} = require('../controllers/movies')

router.get('/', getMovieList)
router.post('/', createMovie)
router.get('/:id', getById)
router.put('/:id', updateMovie)

module.exports = router
