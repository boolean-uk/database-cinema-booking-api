const express = require("express");
const {
  fetchAllMovies,
  deployMovie,
  fetchMovieById,
  updateById,
} = require("../controllers/movies");
const router = express.Router();
router.get("/", fetchAllMovies);
router.get("/:id", fetchMovieById);
router.post("/", deployMovie);
router.put("/:id", updateById);
module.exports = router;
