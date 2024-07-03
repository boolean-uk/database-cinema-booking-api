const express = require('express');
const router = express.Router();
const { createMovie, getAllMovies, getMovieById, updateMovie } = require('../../helpers/createMovie');

router.get('/', async (req, res) => {
    try {
        const movies = await getAllMovies();
        res.status(200).json({ movies });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, runtimeMins } = req.body;
        const movie = await createMovie(title, runtimeMins);
        res.status(201).json({ movie });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await getMovieById(parseInt(id));
        if (movie) {
            res.status(200).json({ movie });
        } else {
            res.status(404).json({ error: 'Movie not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, runtimeMins } = req.body;
        const movie = await updateMovie(parseInt(id), title, runtimeMins);
        res.status(201).json({ movie });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;