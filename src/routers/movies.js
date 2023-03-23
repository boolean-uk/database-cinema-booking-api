const express = require("express");
const moviesController = require("../controllers/movies");

const router = express.Router();

router.get("/", moviesController.getMovies);
router.post("/", moviesController.createMovie);
router.get("/:id", moviesController.getMovieById);
router.put("/:id", moviesController.updateMovieById);

module.exports = router;
