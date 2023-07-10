const express = require("express");
const {
    getAll,
    createMovie
} = require('../controllers/movie')

const router = express.Router();

router.get('/', getAll)

router.post('/', createMovie)

module.exports = router