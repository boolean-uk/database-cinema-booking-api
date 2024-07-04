const { PrismaClientKnownRequestError } = require("@prisma/client")
const {
	createReviewDb,
	getAllreviewsDb,
} = require("../domains/review")

const { MissingFieldsError } = require("../errors/errors")

const getAllReviews = async (req, res) => {
    const allReviews = await getAllreviewsDb()
    res.status(200).json({reviews: allReviews})
}

const createReview = async (req, res) => {
	const { movieId, customerId, content } = req.body

	if (!movieId || !customerId || !content) {
		throw new MissingFieldsError(
			"Movie ID, Customer ID and the review text, must be provided in order to add a review"
		)
	}

	const review = await createReviewDb(movieId, customerId, content)
	res.status(201).json({ review: review })
}

module.exports = {
	createReview,
	getAllReviews,
}
