const express = require("express");
const router = express.Router();
const { all, create, get, update, remove } = require("../controllers/movie");

router.get("/", all);
router.get("/:id", get);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);

module.exports = router;
