const { PrismaClientKnownRequestError } = require("@prisma/client/runtime/library")
const { createScreenDb } = require("../domains/screen")

async function createScreen(req, res) {
    const { number, screenings } = req.body

    if (!number) {
        throw new Error('Missing fields in request body')
    }

    try {
        const createdScreen = await createScreenDb(number, screenings)

        res.status(201).json({
            screen: createdScreen
        })
    } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
            if (e.code === "P2002") {
                throw new Error('A screen with the provided number already exists')
            }
        }
    }
}

module.exports = {
    createScreen
}