const { Prisma } = require("@prisma/client")
const prisma = require('../utils/prisma')


const createNewScreen = async (req, res) => {
    
    try {
        const createdScreen = await prisma.screen.create({
            data: {
                number: req.body.number
                }           
        })
        res.status(201).json({ screen: createdScreen })
    }  catch (err) {
        //console.log( err )
        res.status(404).json({ error: err })
    }
}

module.exports = {
    createNewScreen
}
