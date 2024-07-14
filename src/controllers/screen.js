const { PrismaClientKnownRequestError } = require("@prisma/client")
const { createScreen } = require('../domains/screen.js')


const createNewScreen = async (req, res) => {

    const {
        number
    } = req.body

    if (!number) {
        return res.status(400).json({
          error: "Missing fields in request body"
        })
    }

    try {
        const screen = await createScreen(number)
        
        res.status(201).json({
            screen: screen
        })
    } catch (error) {

        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
              return res.status(409).json({ error: "A screen with the provided number already exists" })
            }
          }
      
          res.status(500).json({ error: error.message })
    }
}

module.exports = { createNewScreen }