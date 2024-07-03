const prisma = require('../utils/prisma')

async function createReviewDb(content, customerId, movieId) {
    const reviewData = {
        data: {
            content: content,
            customerId: customerId,
            movieId: movieId
        },
    }

    return await prisma.review.create(reviewData)
} 

module.exports = {
createReviewDb
}