const express = require("express");
const {
  getMovies,
  createMovie,
  getMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieCon");

const router = express.Router();

router.route("/").get(getMovies).post(createMovie);
router.route("/:id").get(getMovie).put(updateMovie).delete(deleteMovie);

module.exports = router;
