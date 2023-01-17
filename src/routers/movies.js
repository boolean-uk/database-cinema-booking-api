const express = require("express");
const { getAllMovies, createMovie, getMovie, updateMovie } = require("../controllers/movies");

const router = express.Router();

router.get("/", getAllMovies);
router.get("/:id", getMovie)
router.post("/", createMovie)
router.put("/:id", updateMovie)

module.exports = router;
