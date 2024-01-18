const express = require("express")
const { getMovies, createMovie, getMovieBy, updateMovie } = require("../controllers/movie")
const router = express.Router()

router.get("/", getMovies)
router.post("/", createMovie)
router.get("/:searchparam",getMovieBy)
router.put("/:id",updateMovie)

module.exports = router