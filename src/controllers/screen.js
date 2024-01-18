// TODO: update createScreen() to meet ext. criteria (+  write matching spec)

const { createScreenDb } = require("../domains/screen")

const createScreen = async (req, res) => {
    const data = req.body
    const screen = await createScreenDb(data)
    res.status(201).json({screen: screen})
}


const findOrCreateScreenIn = (array) => 
screenings.map(async (screening) => {
    const screen = screening.screen;
    const num = screen.number;
    const foundScreen = await getScreensByDb(num);
    if (foundScreen.length === 0) {
        createScreenDb(screen);
    }
});


module.exports = {
    createScreen, 
    findOrCreateScreenIn
}