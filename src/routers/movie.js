const express = require("express");
const router = express.Router();

const {
    getMovies,
    createMovie,
    getMovie,
    updateMovieById,
} = require("../controllers/movie.js");

router.get("/", getMovies);
router.get("/:id", getMovie);
router.post("/", createMovie);
router.put("/:id", updateMovieById);


module.exports = router;
