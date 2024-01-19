const express = require("express")
const { moviesList, newMovie, getMovieById, updateMovieById } = require('../controllers/movies')

const router = express.Router();

router.get('/', moviesList)
router.post('/', newMovie)
router.get('/:id', getMovieById)
router.put('/:id', updateMovieById)


module.exports = router;

