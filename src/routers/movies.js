const express = require("express");
const { getMovies, createMovie, findMovie, updateMovie } = require("../controllers/movies");

const router = express.Router();

router.get("/", getMovies);
router.post("/", createMovie);
router.get("/:id", findMovie);
router.put("/:id", updateMovie)

module.exports = router;
