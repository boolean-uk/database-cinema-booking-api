const express = require("express");
const { getMovies } = require("../controllers/movie.controller.js");
const validate = require("../middleware/zod/customer.js");

const router = express.Router();

router.get("/", getMovies);

module.exports = router;
