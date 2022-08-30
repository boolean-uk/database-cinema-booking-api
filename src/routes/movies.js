const express = require('express');

const router = express.Router();

const controller = require('../controllers/movies');

router.get('/', controller.getAllMovies);

router.get('/:id', controller.getMovieById);

router.post('/', controller.createMovie);

router.put('/:id', controller.updateMovie);

module.exports = router;
