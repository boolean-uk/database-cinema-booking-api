const express = require("express")
const { getAllScreenings } = require('../controllers/screening')

const router = express.Router()

router.get('/', getAllScreenings)

module.exports = router