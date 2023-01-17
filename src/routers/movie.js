const express = require("express");
const { getMovie, createMovie, getByID } = require("../controllers/movie");

const router = express.Router();

router.get("/", getMovie);
router.post("/", createMovie);
router.get("/:id", getByID);

module.exports = router;
