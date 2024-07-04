const prisma = require("../utils/prisma")

const createReviewDb = async (movieId, customerId, content) => {
	const review = await prisma.review.create({
		data: {
			movieId: movieId,
			customerId: customerId,
			content: content,
		},
	})
	return review
}

const getAllreviewsDb = async () => {
	const getAllReviews = await prisma.review.findMany()
	return getAllReviews
}

module.exports = { createReviewDb, getAllreviewsDb }
