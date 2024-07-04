const { PrismaClientKnownRequestError } = require("@prisma/client")
const {
	createReviewDb,
	getAllreviewsDb,
	getReviewsByMovieTitleDb,
} = require("../domains/review")
const { getMovieByIdDb } = require("../domains/movie")
const { getMovieById } = require("../controllers/movie")

const {
	MissingFieldsError,
	DataNotFoundError,
} = require("../errors/errors")

const getAllReviews = async (req, res) => {
	const allReviews = await getAllreviewsDb()
	res.status(200).json({ reviews: allReviews })
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

const getReviewsByMovieTitle = async (req, res) => {
	const { idOrTitle } = req.params
	const movie = await getMovieByIdDb(idOrTitle)

	if (!movie) {
		throw new DataNotFoundError(
			"No movie with the provided title exists"
		)
	}

	const movieReviews = await getReviewsByMovieTitleDb(idOrTitle)
	res.status(200).json({ reviews: movieReviews })
}

module.exports = {
	createReview,
	getAllReviews,
	getReviewsByMovieTitle,
}
