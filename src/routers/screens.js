const express = require("express");
const { deployScreen, fetchAllScreens } = require("../controllers/screens");
const router = express.Router();
router.get("/", fetchAllScreens);
router.post("/", deployScreen);
module.exports = router;
