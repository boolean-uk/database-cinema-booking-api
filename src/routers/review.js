const express = require("express");
const {
    getAllReviews,
    createReview,
    
} = require('../controllers/review');

const router = express.Router();

router.post("/", createReview)
router.get("/", getAllReviews)


module.exports = router;