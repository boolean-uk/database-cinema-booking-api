const express = require("express");
const router = express.Router();

const {
  getMovieList,
  postMovie,
  getMovieById,
  updateMovieById,
} = require("../controllers/movie.js");

router.get("/", getMovieList);
router.post("/", postMovie);
router.get("/:id", getMovieById);
router.put("/:id", updateMovieById);

module.exports = router;
