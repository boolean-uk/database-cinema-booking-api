const { Prisma } = require("@prisma/client")
const prisma = require('../utils/prisma')

const addScreen = async (req, res) => {

   // const  { number } = req.body

   const screen = await prisma.screen.create ({
      data:{
          "number": req.body.number
      } 
  })
  res.json({ screen: screen })
}

module.exports = {
   addScreen
}
