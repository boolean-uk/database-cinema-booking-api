const { createScreen, findScreen } = require("../domains/screen")
const { MissingFields, AlreadyExists } = require('../errorClasses/index.js')

const addScreen = async (req, res) => {
    const screen = req.body.number
    if (
        req.body.number === "" ||
        req.body.number === undefined
    ) {
        throw new MissingFields("Number field missing from screenings")
    }
    if (findScreen(req)) {
        throw new AlreadyExists("This screen already exists please select another screen")
    }
    const createdScreen = await createScreen(req)
    console.log('created screen await')
    res.status(201).json({
        screen: createdScreen
    })
}

module.exports = {
    addScreen
}