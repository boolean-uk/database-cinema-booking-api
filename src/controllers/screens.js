const { Prisma } = require('@prisma/client');
const prisma = require('../utils/prisma');

const createScreen = async (req, res) => {
    const { number } = req.body;
    if (!number) {
        return res.status(400).json({
            error: 'Missing fields in request body',
        });
    }

    const screen = await prisma.screen.create({
        data: {
            number,
        },
    });

    res.status(201).json({ screen });
};

// Michaels solution

// const newScreen = await prisma.screen.create({
//     data: {
//         number: screenNumber,
//     },
// });

// const updatedScreen = await prisma.screen.update({
//     where: {
//         id: newScreen.id,
//     },
//     data: {
//         screenings: {
//             create: screenings,
//         },
//     },
//     include: {
//         screenings: true,
//     },
// });
// res.status(201).json({ screen: updatedScreen });

// ------------------------------------------------

// Eds solution

// Nested Create

// const createScreen = async (req, res) => {
//     const { number, screenings } = req.body;

//     const data = {
//         number: Number(number),
//     };

//     if (screenings) {
//         data.screenings = {
//             create: screenings,
//         };
//     }

//     try {
//         const screen = await prisma.screen.create({
//             data: data,
//             include: {
//                 screenings: true,
//             },
//         });
//         res.status(201).json({ screen });
//     } catch (e) {
//         console.log(e);
//         res.status(500).json({ error: e });
//     }
// };

//-----------------------------------------------

// Nested Update

// const createScreen = async (req, res) => {
//     const { number, screenings } = req.body;

//     const screenData = {
//         number: Number(number),
//     };

//     const screen = await prisma.screen.create({
//         data: screenData,
//     });

//     const updatedScreen = await prisma.screen.update({
//         data: {
//             screenings: {
//                 create: screenings,
//             },
//         },
//         where: {
//             id: screen.id,
//         },
//         include: {
//             screenings: true,
//         },
//     });

//     res.status(201).json({ screen: updatedScreen });
// };

module.exports = {
    createScreen,
};
