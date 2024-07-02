const prisma = require("../../src/utils/prisma")

const createReview = async (customer, movie, content) => {
  return await prisma.review.create({
      data: {
        customerId: customer.id,
        movieId: movie.id,
        content: content,
      },
      include: {
        customer: true,
        movie: true,
      },
  })
}

module.exports = createReview
