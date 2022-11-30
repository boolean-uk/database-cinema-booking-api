const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const getReviews = async (req, res) => {
  const reviews = await prisma.reviews.findMany();
  res.json({ reviews: reviews });
};

const createReviews = async (req, res) => {
  const { text, movieId, customerId } = req.body;

  const review = await prisma.reviews.create({
    data: {
      text,
      customerId,
      movieId,
    },
  });

  res.status(201).json({ review: review });
};

module.exports = { createReviews, getReviews };
