const express = require("express")
const {
	createReview,
	getAllReviews,
	getReviewsByMovieTitle,
} = require("../controllers/review")

const router = express.Router()

router.get('/', getAllReviews)

router.get('/:idOrTitle', getReviewsByMovieTitle)

router.post('/', createReview)


module.exports = router