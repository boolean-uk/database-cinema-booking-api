const prisma = require('../utils/prisma');

/**
 * Creates a new review for a movie by a customer.
 * @param {number} customerId - ID of the customer who is creating the review.
 * @param {number} movieId - ID of the movie for which the review is being created.
 * @param {number} rating - Rating given by the customer for the movie.
 * @param {string} content - Content of the review.
 * @returns {Promise<object>} Created review object with included movie and customer details.
 */
const createReviewDb = async (customerId, movieId, rating, content) => {
    try {
        const movie = await prisma.movie.findUniqueOrThrow({
            where: { id: movieId },
        });

        const customer = await prisma.customer.findUniqueOrThrow({
            where: { id: customerId },
            include: { contact: true }, 
        });


        const review = await prisma.review.create({
            data: {
                customerId,
                movieId,
                rating,
                content,
            },
            include: {
                movie: true,
                customer: true, 
            },
        });

        return review;
    } catch (error) {
        throw new Error(`Failed to create review: ${error.message}`);
    }
};

module.exports = { createReviewDb };
