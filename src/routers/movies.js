const express = require("express")

const {
    getAllMovies,
    createMovie,
    getMovieById,
    updateMovieById
} = require('../controllers/movies')

const router = express.Router()


router.get('/', async(req, res) => {
    const movies = await getAllMovies()
    res.json({movies})
})

router.post('/', async(req, res) => {
    const movie = await createMovie(req)
    res.status(201).json({movie})
})

router.get('/:id', async(req, res) => {
    const id = req.params.id
    const movie = await getMovieById(id)
    res.json({movie})
})

router.put('/:id', async(req, res) => {
    const id = req.params.id
    const movie = await updateMovieById(id, req)
    res.status(201).json({movie})
})



module.exports = router
