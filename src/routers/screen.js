const express = require("express");
const router = express.Router();

const { fetchCreate } = require("../controllers/screen.js");

router.post("/", fetchCreate);

module.exports = router;
