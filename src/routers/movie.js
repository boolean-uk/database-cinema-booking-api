const express = require('express')
const router = express.Router()

const {
    getAllMovies,
    createMovie,
    getMovieById,
    updateMovieById,
} = require('../controllers/movie')


router.get('/', getAllMovies);
router.post('/', createMovie);
router.get('/:id', getMovieById);
router.put('/:id', updateMovieById)
module.exports = router