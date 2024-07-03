const { getAllReviewsDb, createReviewDb } = require("../domains/reviews")
const { MissingFieldsError } = require("../errors/errors")

async function getAllReviews(req, res) {
    const reviews = await getAllReviewsDb()
    res.status(200).json( {reviews} )
}

async function createReview(req, res) {
    const { customerId, movieId, title, content } = req.body
    
    if (!customerId || !movieId || !title || !content) {
        throw new MissingFieldsError("Reviews require a customer ID, movie ID, title, and content")
    }

    const review = await createReviewDb(customerId, movieId, title, content )

    res.status(201).json({ review })
}

module.exports = { getAllReviews, createReview }