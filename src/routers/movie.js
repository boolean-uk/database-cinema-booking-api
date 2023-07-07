const express = require("express");
const {
  getAllMovies,
  createMovies,
  getMoviesID,
  updateMovies,
} = require("../controllers/movie");

const router = express.Router();

router.get("/", getAllMovies);
router.post("/", createMovies);
router.get("/:id", getMoviesID);
router.put("/:id", updateMovies);
module.exports = router;
