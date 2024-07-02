const { createScreenDb } = require("../domains/screen")
const MissingFieldsError = require("../errors/missingFieldsError")

async function createScreen(req, res) {
    const { number, screenings } = req.body

    if (!number) {
        throw new MissingFieldsError('Missing fields in request body')
    }

    const createdScreen = await createScreenDb(number, screenings)

    res.status(201).json({
        screen: createdScreen
    })
}

module.exports = {
    createScreen
  }