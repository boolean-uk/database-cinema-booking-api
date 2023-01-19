const { Prisma } = require("@prisma/client");
const { screening } = require("../utils/prisma");
const prisma = require("../utils/prisma");

const createReview = async (req, res) => {
  const { content, customerId, movieId } = req.body;
  const movie = await prisma.movie.findFirst({
    where: {
      id: Number(movieId),
    },
  });
  const customer = await prisma.customer.findFirst({
    where: {
      id: Number(customerId),
    },
  });
  try {
    const review = await prisma.review.create({
      data: {
        content,
        customer: {
          connect: {
            id: customer.id,
          },
        },
        movie: {
          connect: {
            id: movie.id,
          },
        },
      },
      include: {
        movie: true,
        customer: true,
      },
    });
    res.status(201).json({ review });
  } catch (e) {}
};

module.exports = { createReview };
