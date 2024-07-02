const {
  getAllReviewsDb,
  createReviewDb,
  getReviewByIdDb,
  updateReviewDb,
  deleteReviewDb,
} = require("../domains/review")

const getAllReviews = async (req, res) => {
  const reviews = await getAllReviewsDb()

  res.json({
    reviews,
  })
}

const creteReview = async (req, res) => {
  const { customerId, movieId, content } = req.body

  const review = await createReviewDb(customerId, movieId, content)

  res.status(201).json({
    review,
  })
}

const getReviewById = async (req, res) => {
  const id = Number(req.params.id)
  const review = await getReviewByIdDb(id)

  res.json({
    review,
  })
}

const updateReview = async (req, res) => {
  const id = Number(req.params.id)
  const { content } = req.body

  const review = await updateReviewDb(id, content)

  res.status(201).json({
    review,
  })
}

const deleteReview = async (req, res) => {
  const id = Number(req.params.id)
  const review = await deleteReviewDb(id)

  res.json({
    review,
  })
}

module.exports = {
  getAllReviews,
  creteReview,
  getReviewById,
  updateReview,
  deleteReview,
}
