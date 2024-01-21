
const { createScreenDb, createScreeningsAndScreenDb, getScreenByNum } = require('../domains/screen.js')

// creating a screen

const createScreen = async (req, res) => {
    const {number, screenings} = req.body

    if (!number) 
    return res.status(400).json({err: 'Please provide a screen number'})

    const multipleScreen = await getScreenByNum(number)
    if (multipleScreen)
    return res.status(409).json({err: 'A screen has got same number provided'})

    if (screenings) {
        const screenAndScreenings = await createScreeningsAndScreenDb(number, screenings)
        return res.status(201).json({screen: screenAndScreenings})
    }

    const newScreen = await createScreenDb(number)
    return res.status(201).json({screen: newScreen})
}

module.exports = {createScreen}