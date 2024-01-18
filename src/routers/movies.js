const express = require("express")
const { moviesList, newMovie, getMovieById } = require('../controllers/movies')

const router = express.Router();

router.get('/', moviesList)
router.post('/', newMovie)
router.get('/:id', getMovieById)


module.exports = router;