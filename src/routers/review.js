const express = require("express")
const { getAllReviews, creteReview, getReviewById, updateReview, deleteReview } = require("../controllers/review")
const router = express.Router()

router.get("/", getAllReviews)
router.post("/", creteReview)
router.get("/:id", getReviewById)
router.put("/:id", updateReview)
router.delete("/:id", deleteReview)

module.exports = router
