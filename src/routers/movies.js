const express = require("express");
const { getMovies, createMovie, findMovie } = require("../controllers/movies");

const router = express.Router();

router.get("/", getMovies);
router.post("/", createMovie);
router.get("/:id", findMovie);

module.exports = router;
