const express = require("express");
const reviewsController = require("../controllers/reviews");

const router = express.Router();

router.post("/:id", reviewsController.createReview);

module.exports = router;
