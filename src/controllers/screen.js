const { PrismaClientKnownRequestError } = require("@prisma/client")
const { fieldValidation, validateId } = require("../help/validation")
const { createScreenWithScreening, createScreenDb } = require("../domains/screen")


const createScreen = async (req, res) => {
    const { number, screenings } = req.body

    let createdScreen;
    try {
        // fieldValidation(number)

        if(screenings) {
            console.log('this is the screening number if', number)
            createdScreen = await createScreenWithScreening(number, screenings);
        } else {
            console.log('this si the else number', number)
            createdScreen = await createScreenDb(number);
        }

        console.log('this is the created screen', createdScreen.id, createdScreen.number)
        return res.status(201).json({screen: createdScreen})

    } catch (error) {
        console.error('Error creating screen:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}



module.exports = {
    createScreen
}