const prisma = require('../utils/prisma')

const createReviewDb = async (customerId, movieId, rating, content) => {
    await prisma.movie.findUniqueOrThrow({
        where: { id: movieId },
    })

    await prisma.customer.findUniqueOrThrow({
        where: { id: customerId },
    })

    return await prisma.review.create({
        data: {
            customerId: customerId,
            movieId: movieId,
            rating: rating,
            content: content,
        },
        include: {
            movie: true,
            customer: {
                include: {
                    contact: true,
                },
            },
        },
    })
}

module.exports = { createReviewDb }
