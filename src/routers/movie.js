const express = require("express");
const {
	getMovie,
	createMovie,
	getByID,
	updateByID,
} = require("../controllers/movie");

const router = express.Router();

router.get("/", getMovie);
router.post("/", createMovie);
router.get("/:id", getByID);
router.put("/:id", updateByID);

module.exports = router;
