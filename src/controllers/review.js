const MissingFieldsError = require("../errors/missingFieldsError")
const { createReviewDb } = require("../domains/review")

async function createReview(req, res) {
    const { content, customerId, movieId } = req.body

    if (!content || !customerId || !movieId) {
        throw new MissingFieldsError('Missing fields in request body')
    }

    const createdReview = await createReviewDb(content, customerId, movieId)

    res.status(201).json({
        review: createdReview
    })
}

module.exports = {
    createReview
}