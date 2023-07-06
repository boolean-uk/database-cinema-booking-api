const express = require("express")

const {
    getAllMovies
} = require('../controllers/movies')

const router = express.Router()


router.get('/', async(req, res) => {
    const movies = await getAllMovies()
    res.json({movies})
})

// router.post()

module.exports = router
