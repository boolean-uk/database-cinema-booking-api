const { createScreen, findScreen } = require("../domains/screen")

const addScreen = async (req, res) => {
    const { number } = req.body
    if (!number) {
        return res.status(400).json({
            error: "Number field missing from screenings"
        })
    }
    if (findScreen(number) === true) {
        return res.status(409).json({
            error: "This screen already exists please select another screen"
        })
    } 
    try {
        const createdScreen = await createScreen(req)
    
        res.status(201).json({
        screen: createdScreen
    })
    } catch(e) {
        if(e.code === "P2002") {
            return res.status(409).json({
                error: "This screen already exists please select another screen"
            })
        }
    }
}

module.exports = {
    addScreen
}