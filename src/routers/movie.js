const express = require("express");
const router = express.Router();

const {
    getMovies,
    createMovie,
    getMovieById,
    updateMovieById,
} = require("../controllers/movie.js");

router.get("/", getMovies);
router.get("/:id", getMovieById);
router.post("/", createMovie);
router.put("/:id", updateMovieById);

module.exports = router;
