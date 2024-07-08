const { createReviewDb } = require('../domains/reviews.js');
const { PrismaClientKnownRequestError } = require('@prisma/client');

const createReview = async (req, res) => {
  const { customerId, movieId, rating, content } = req.body;

  try {
    if (!customerId || !movieId || !rating || !content) {
      return res.status(400).json({ error: 'Missing fields in request body' });
    }

    const createdReview = await createReviewDb(customerId, movieId, rating, content);

    res.status(201).json({ review: createdReview });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Matching customer or movie not found' });
      }
    }

    console.error('Error creating review:', error);
    res.status(500).json({ error: 'Failed to create review' });
  }
};

module.exports = { createReview };
