const { createScreenDb } = require('../domains/screens.js')

const createScreen = async (req, res) => {
    const number = Number(req.body.number)
    const {screenings} = req.body

    if (!number) {
        return res.status(400).json({
            error: 'Missing fields in request body',
        })
    }

    try {
        const createdScreen = await createScreenDb(number, screenings)

        res.status(201).json({ screen: createdScreen })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}
module.exports = { createScreen }
