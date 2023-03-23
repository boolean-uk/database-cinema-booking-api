const { Prisma } = require("@prisma/client")
const prisma = require('../utils/prisma')

const createScreen = async (req, res) => {
   const screenNumber = req.body.number;

   if(!screenNumber) {
    return res.status(400).json({ error: " Missing or Invalid Input field"});
   }

   const newScreen = await prisma.screen.create({
    data: {
        number: screenNumber,
    },
    include: {
        screenings: true,
      },
   });
   return res.status(201).json({ screen: newScreen})
}
module.exports= { 
    createScreen,
}