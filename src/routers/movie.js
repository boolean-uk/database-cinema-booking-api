const express = require("express");
const {
    getMovies,
    createMovie,
    fetchMovieByID,
    updateMovie
} = require('../controllers/movie');

const router = express.Router();


router.get("/", getMovies);

router.post("/", createMovie)

router.get("/:id", fetchMovieByID)

router.put("/:id", updateMovie)


module.exports = router