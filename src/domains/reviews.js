const prisma = require("../utils/prisma");

async function getAllReviewsDb() {
    return await prisma.review.findMany({
        include: {
            customer: true,
            movie: true
        }
    })
}

async function createReviewDb(customerId, movieId, title, content) {
  return await prisma.review.create({
        data: {
            movieId: movieId,
            customerId: customerId,
            title: title,
            content: content
        },
        include: {
            movie: true,
            customer: true
        }
    }) 
}

module.exports = { getAllReviewsDb, createReviewDb }