const express = require("express");
const {
    createMovie,
    getMovies,
    getMovieById,
    updateMovie,
} = require('../controllers/movie');

const router = express.Router();

router.get("/", getMovies);
router.post("/", createMovie);
router.get("/:id", getMovieById);
router.put("/:id", updateMovie);

module.exports = router;