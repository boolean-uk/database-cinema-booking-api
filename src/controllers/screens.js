const { createScreenDb } = require('../domains/screens')

async function createScreen(req, res) {
    const props = req.body
    const screen = await createScreenDb(props)
    res.status(201).json({ screen })
}

module.exports = { createScreen }