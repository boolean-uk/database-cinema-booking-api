const { createScreen } = require("../domains/screen")

const addScreen = async (req, res) => {
    const createdScreen = await createScreen(req)
    res.status(201).json({
        screen: createdScreen
    })
}

module.exports = {
    addScreen
}