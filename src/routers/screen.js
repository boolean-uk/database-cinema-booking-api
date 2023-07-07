const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const express = require("express");
const { createScreen } = require("../controllers/screen");

const router = express.Router();

router.post("/", createScreen);

module.exports = router;
