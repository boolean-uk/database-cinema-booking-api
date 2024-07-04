const express = require("express")
const { createReview, getAllReviews } = require('../controllers/review')

const router = express.Router()

router.get('/', getAllReviews)

router.post('/', createReview)

module.exports = router