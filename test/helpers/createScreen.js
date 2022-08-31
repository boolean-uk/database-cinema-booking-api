const prisma = require("../../src/utils/prisma");

const createScreen = async (number) => {
    return await prisma.screen.create({
        data: {
            number: number,
        }
    })
}
const createScrenWithScreenings = async(number,screenings)=>{
    const mappedScreen = screenings.map((screen) => {
        const { movieId ,screenId,startsAt } = screen;
       console.log({screen});
        return {
            startsAt: new Date(startsAt),
            movie: {
                connect: {
                    id: Number(movieId)
                }
            }
        }
    })
    
    return await prisma.screen.create({
        data:{
            number,
            screenings: {
                create: mappedScreen,
            }
        },
        include: { screenings: true }
    });

}
module.exports = {
  createScreen,
  createScrenWithScreenings
}
