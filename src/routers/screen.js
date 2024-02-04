const express = require("express");
const { deployScreen, fetchAllScreens } = require("../controllers/screen");
const router = express.Router();
router.get("/", fetchAllScreens);
router.post("/", deployScreen);
module.exports = router;