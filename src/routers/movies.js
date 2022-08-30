const express = require("express");

const {
    getMovies, createMovie, getByID, updateMovie
} = require('../controllers/movie');

const router = express.Router();

router.get("/", getMovies);
router.post('/', createMovie)
router.get('/:id', getByID)
router.put('/:id', updateMovie)

module.exports = router;