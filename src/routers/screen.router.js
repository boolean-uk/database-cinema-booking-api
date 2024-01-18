const express = require("express");
const { validateBody } = require("../middleware/zod/validate");
const { postScreen } = require("../controllers/screen.controller");
const { newScreenSchema } = require("../middleware/zod/screen.zod");

const router = express.Router();

router.post("/", validateBody(newScreenSchema), postScreen);

module.exports = router;
