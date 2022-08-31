const express = require("express");
const {
  getMovies,
  createMovie,
  getMovie,
  updateMovie,
} = require("../controllers/movies");

const router = express.Router();

router.get("/", getMovies);
router.post("/", createMovie);
router.get("/:id", getMovie);
router.put("/:id", updateMovie);

module.exports = router;
