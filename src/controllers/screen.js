const { createScreenDb } = require("../domains/screen")

async function createScreen(req, res) {
    const { number } = req.body

    const createdScreen = await createScreenDb(number)

    res.status(201).json({
        screen: createdScreen
    })
}

module.exports = {
    createScreen
  }