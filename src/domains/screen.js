const prisma = require("../utils/prisma");


const createScreenDb = async (number) => {
  return await prisma.screen.create({
    data: {
      number,
      
    },
    
  });
  
  
}
module.exports = {  createScreenDb };