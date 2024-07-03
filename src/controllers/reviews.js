const { createReviewDb } = require('../domains/reviews.js')

const createReview = async (req, res) => {
    const { customerId, movieId, rating, content } = req.body

    if (!customerId || !movieId || !rating || !content) {
        return res.status(400).json({
            error: 'Missing fields in request body',
        })
    }

    try {
        const createdReview = await createReviewDb(
            customerId,
            movieId,
            rating,
            content
        )

        res.status(201).json({ review: createdReview })
    } catch (e) {
        if (e.code === 'P2025') {
            return res
                .status(404)
                .json({ error: 'Matching customer or movie not found' })
        }

        res.status(500).json({ error: e.message })
    }
}
module.exports = { createReview }
