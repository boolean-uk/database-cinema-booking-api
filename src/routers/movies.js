const express = require("express")
const { getMovies } = require("../controllers/movie")
const router = express.Router()

router.get("/", getMovies)

module.exports = router