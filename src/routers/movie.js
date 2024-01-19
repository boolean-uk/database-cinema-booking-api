const express = require("express");
const router = express.Router();

const {
    getMovies,
    createMovie,
    getMovie,
    updateMovie,
} = require("../controllers/movie.js");

router.get("/", getMovies);
router.get("/:identifier", getMovie);
router.post("/", createMovie);
router.put("/:identifier", updateMovie);


module.exports = router;
