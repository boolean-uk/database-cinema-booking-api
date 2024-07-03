const prisma = require("../../src/utils/prisma");


async function createReview(customer, movie, title, content) {
    return await prisma.review.create({
        data: {
            movieId: movie.id,
            customerId: customer.id,
            title: title,
            content: content
        },
        include: {
            movie: true,
            customer: true
        }
    })
}

module.exports = { createReview }