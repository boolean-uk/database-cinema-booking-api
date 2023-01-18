const { Prisma } = require("@prisma/client")
const prisma = require('../utils/prisma')

const createScreen = async (req, res) => {
    const { number } = req.body;
    if(!number){
        res.json({result: "a number fild is required"})
    }
    const createdScreen = await prisma.screen.create({
        data: {
            number: Number.parseInt(number)
        }
    })

    res.status(201).json({screen: createdScreen})
}

module.exports = { 
    createScreen
}