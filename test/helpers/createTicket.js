const prisma = require("../../src/utils/prisma");

const createTicket = async (screeningId, customerId )=>{
return await prisma.ticket.create({
    data: {
        screeningId,
        customerId
    },
    include: {
        screening: {
            include: {
                screen: true,
                movie: true
            }
        },
        customer: true,

    }
});

}
module.exports={
    createTicket
}