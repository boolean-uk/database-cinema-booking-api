const express = require("express");
const { addDisplay, retrieveAllDisplays } = require("../controllers/screens");
const router = express.Router();
router.get("/", retrieveAllDisplays);
router.post("/", addDisplay);
module.exports = router;
