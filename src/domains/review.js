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
    const getAllReviews = await prisma.review.findMany({
        include: {
            movie: true,
        }
    })
	return getAllReviews
}


const getReviewsByMovieTitleDb = async (title) => {
    console.log(title);
	const getReviewsForMovie = await prisma.review.findFirst({
		where: {
			movie: {
				title: title,
			},
		},
    })
	return getReviewsForMovie
}


module.exports = { createReviewDb, getAllreviewsDb, getReviewsByMovieTitleDb }
