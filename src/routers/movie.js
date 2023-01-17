const express = require("express");
const { getMovie } = require("../controllers/movie");

const router = express.Router();

router.get("/", getMovie);
// router.post("/", createMovie);

module.exports = router;
