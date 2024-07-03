const express = require('express')
const { createReview } = require('../controllers/reviews')

const router = express.Router()

router.post('/', createReview)

module.exports = router
