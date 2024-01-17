// TODO: update createScreen() to meet ext. criteria (+  write matching spec)

const { createScreenDb } = require("../domains/screen")

const createScreen = async (req, res) => {
    const data = req.body
    const screen = await createScreenDb(data)
    res.status(201).json({screen: screen})
}

module.exports = {
    createScreen
}