const express = require('express')
const {getMovies} = require("../controllers/movies")
const {addMovie} = require("../controllers/movies")
const {getMoviesByID} = require("../controllers/movies")
const {updateMovieByID} = require("../controllers/movies")

const router = express.Router()

router.get("/", getMovies);
router.post("/", addMovie);
router.get("/:id", getMoviesByID);
router.put("/:id", updateMovieByID);



module.exports = router;



