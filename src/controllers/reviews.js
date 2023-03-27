const { Prisma } = require("@prisma/client");

const prisma = require("../utils/prisma");

const createReview = async (req, res) => {
  const movieId = Number(req.params.id);
  const body = req.body;

  if (
    body.review === undefined ||
    body.rating === undefined ||
    body.rating > 5 ||
    body.rating < 0
  ) {
    return res.status(400).json({ error: "Missing or invalid input field." });
  }

  const data = {
    data: {
      review: body.review,
      rating: body.rating,
      movieId: movieId,
      customerId: body.customerId,
    },
    include: {
      movie: true,
      customer: true,
    },
  };

  try {
    const review = await prisma.review.create(data);
    res.status(201).json({ review });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2003") {
        return res.status(404).json({ error: "Customer or Movie not found" });
      }
    }
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  createReview,
};
