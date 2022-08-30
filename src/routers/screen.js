const express = require('express');
const {
    getAllScreen,
    createScreen,
    getScreenById
} = require("../controllers/screen");

const router = express.Router();
router.get("",getAllScreen);
router.get("/:id",getScreenById);
router.post("",createScreen);

module.exports = router;
//router.get("",getAllMovies);