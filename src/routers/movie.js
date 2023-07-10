const express = require("express");
const {
    getAll,
    createMovie,
    getById
} = require('../controllers/movie')

const router = express.Router();

router.get('/', getAll)

router.post('/', createMovie)

router.get('/:id', getById)

module.exports = router