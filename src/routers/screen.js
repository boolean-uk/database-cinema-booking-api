const express = require("express")

const {createScreen} = require('../controllers/screen')

const router = express.Router()

router.post('/', async(req, res) => {
    const screen = await createScreen(req)
    res.status(201).json({screen})
})

module.exports = router