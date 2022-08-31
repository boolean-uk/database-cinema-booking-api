const express = require("express");
const {
    createMovie, getAllMovies, getMovieById, updateMovieById
} = require('../controllers/movie');

const router = express.Router();

router.get("/", getAllMovies);
router.post("/", createMovie);
router.get("/:id", getMovieById);
router.put("/:id", updateMovieById);

module.exports = router;
