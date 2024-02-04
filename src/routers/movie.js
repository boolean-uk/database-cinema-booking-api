const express = require("express")
const router = express.Router()
const { getAllMovies, getMovieById, createMovie, updateMovie } = require("../controllers/movie.js")
router.get("/", getAllMovies)
router.get("/:id", getMovieById)
router.post("/", createMovie)
router.put("/:id", updateMovie)

module.exports = router;
