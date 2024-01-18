const express = require("express")
const { moviesList } = require('../controllers/movies')

const router = express.Router();

router.get('/', moviesList)

module.exports = router;