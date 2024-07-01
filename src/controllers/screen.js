const { createScreen, findScreen } = require("../domains/screen")

const addScreen = async (req, res) => {
    if (
        req.body.number === "" ||
        req.body.number === undefined
    ) {
        throw new MissingFields("Number field missing from screenings")
    }
    if (findScreen()) {
        throw new AlreadyExists("This screen already exists please select another screen")
    }
    const createdScreen = await createScreen(req)
    res.status(201).json({
        screen: createdScreen
    })
}

module.exports = {
    addScreen
}