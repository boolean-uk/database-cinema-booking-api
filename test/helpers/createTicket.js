// const prisma = require("../../src/utils/prisma");

// const createTicket = async (screeningId, customerId) => {
//   const { screeningId, customerId } = req.body;
//   return await prisma.screen.create({
//     data: {
//       screeningId: {
//         create: { screeningId },
//       },
//       customerId: {
//         create: { customerId },
//       },
//     },
//     include: {
//       customer: true,
//       screenings: true,
//     },
//   });
// };

// module.exports = {
//   createTicket,
// };
