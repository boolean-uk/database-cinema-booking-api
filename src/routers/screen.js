const express = require("express");
const screenRouter = express.Router();

const { addScreen } = require("../controllers/screen.js");

screenRouter.post("/", addScreen);

module.exports = screenRouter;
