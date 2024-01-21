const express = require("express");
const {
  fetchAllMovies,
  insertMovie,
  retrieveMovieById,
  modifyMovieById,
} = require("../controllers/movies");
const router = express.Router();
router.get("/", fetchAllMovies);
router.get("/:id", retrieveMovieById);
router.post("/", insertMovie);
router.put("/:id", modifyMovieById);
module.exports = router;
