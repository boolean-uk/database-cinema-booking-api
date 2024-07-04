const express = require("express");
const { createScreen } = require("../controllers/screenCon");

const router = express.Router();

router.route("/").post(createScreen);

module.exports = router;
