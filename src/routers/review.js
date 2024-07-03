const express = require("express");
const { createReview } = require("../controllers/review");

const router = express.Router();

router.post('/', createReview)

module.exports = router;