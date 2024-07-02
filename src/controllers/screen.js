const { createScreenDb } = require("../domains/screen")

async function createScreen(req, res) {
    const { number, screenings } = req.body

    const createdScreen = await createScreenDb(number, screenings)

    res.status(201).json({
        screen: createdScreen
    })
}

module.exports = {
    createScreen
  }