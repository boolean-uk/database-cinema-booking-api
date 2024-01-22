const express = require("express");
const router = express.Router();

const {
  getMovieList,
  postMovie,
  getMovieById,
} = require("../controllers/movie.js");

router.get("/", getMovieList);
router.post("/", postMovie);
router.get("/:id", getMovieById);

module.exports = router;
