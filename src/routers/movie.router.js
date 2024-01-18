const express = require("express");
const {
  getMovies,
  getMovieById,
  postMovie,
  putMovie,
} = require("../controllers/movie.controller.js");
const { validateBody } = require("../middleware/zod/validate.js");
const { newMovieSchema } = require("../middleware/zod/movie.zod.js");

const router = express.Router();

router.get("/", getMovies);
router.get("/:id", getMovieById);
router.post("/", validateBody(newMovieSchema), postMovie);
router.put("/:id", validateBody(newMovieSchema), putMovie);

module.exports = router;
