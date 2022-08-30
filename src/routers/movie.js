const express = require("express");
const {
    getAllMovies,
    createMovie,
    getMovieById,
    updateMovieById
} =  require('../controllers/movie');

const router = express.Router();
router.post("",createMovie);
router.get("",getAllMovies);
router.get("/:id",getMovieById);
router.put("/:id",updateMovieById);

module.exports = router;