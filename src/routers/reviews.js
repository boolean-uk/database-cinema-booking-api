const express = require("express");
const { createReviews, getReviews } = require("../controllers/reviews");

const router = express.Router();

router.get("/", getReviews);
router.post("/create", createReviews);

module.exports = router;
