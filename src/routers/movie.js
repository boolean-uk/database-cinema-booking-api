const express = require("express")
const { getAllMovies, getMovieById, createMovie, updateMovie } = require("../controllers/movie.js")


const router = express.Router()

router.get("/movies", getAllMovies)
router.get("/movies", getMovieById)
router.posts("/movies", createMovie)
router.put("/movies", updateMovie)

module.exports = router;
