const express = require("express");
const {
    getAll,
    createMovie,
    getById,
    updateById
} = require('../controllers/movie')

const router = express.Router();

router.get('/', getAll)

router.post('/', createMovie)

router.get('/:id', getById)

router.put('/:id', updateById)


module.exports = router