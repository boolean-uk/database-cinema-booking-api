const express = require('express')
const {addScreen} = require ("../controllers/screens")

const router = express.Router()

router.post(("/", addScreen))



module.exports = router;