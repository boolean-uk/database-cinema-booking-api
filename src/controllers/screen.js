const { PrismaClientKnownRequestError } = require("@prisma/client/runtime/library")
const { createScreenDb } = require("../domains/screen")
const MissingFieldsError = require("../errors/missingFieldsError")
const NotUniqueError = require("../errors/notUniqueError")

async function createScreen(req, res) {
    const { number, screenings } = req.body

    if (!number) {
        throw new MissingFieldsError('Missing fields in request body')
    }

    try {
        const createdScreen = await createScreenDb(number, screenings)

        res.status(201).json({
            screen: createdScreen
        })
    } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
            if (e.code === "P2002") {
                throw new NotUniqueError('A screen with the provided number already exists')
            }
        }
      
        res.status(500).json({ error: e.message })
    }
}

module.exports = {
    createScreen
  }