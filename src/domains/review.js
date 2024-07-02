const BadRequest = require("../errors/BadRequest")
const NotFound = require("../errors/NotFound")
const prisma = require("../utils/prisma")

const getAllReviewsDb = async () =>
  await prisma.review.findMany({
    include: {
      customer: true,
      movie: true,
    },
  })

const createReviewDb = async (customerId, movieId, content) => {
  if (!customerId || !movieId || !content) {
    throw new BadRequest("Missing fields in request body")
  }

  return await prisma.review.create({
    data: {
      customerId: customerId,
      movieId: movieId,
      content: content,
    },
    include: {
      customer: true,
      movie: true,
    },
  })
}

const getReviewByIdDb = async (id) => {
  const review = await prisma.review.findUnique({
    where: {
      id: id,
    },
  })

  if (!review) {
    throw new NotFound("Review with that id does not exist")
  }

  return await prisma.review.findUnique({
    where: {
      id: id,
    },
    include: {
      customer: true,
      movie: true,
    },
  })
}

const updateReviewDb = async (id, content) => {
  const review = await prisma.review.findUnique({
    where: {
      id: id,
    },
  })

  if (!review) {
    throw new NotFound("Review with that id does not exist")
  }

  if (!content) {
    throw new BadRequest("Missing fields in request body")
  }

  return await prisma.review.update({
    where: {
      id: id,
    },
    data: {
      content: content,
    },
    include: {
      customer: true,
      movie: true,
    },
  })
}

const deleteReviewDb = async (id) => {
  const review = await prisma.review.findUnique({
    where: {
      id: id,
    },
  })

  if (!review) {
    throw new NotFound("Review with that id does not exist")
  }

  return await prisma.review.delete({
    where: {
      id: id,
    },
    include: {
      customer: true,
      movie: true,
    },
  })
}

module.exports = {
  getAllReviewsDb,
  createReviewDb,
  getReviewByIdDb,
  updateReviewDb,
  deleteReviewDb,
}
