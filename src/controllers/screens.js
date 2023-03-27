const { Prisma } = require('@prisma/client');
const prisma = require('../utils/prisma');

const createScreen = async (req, res) => {
    const { number, screenings } = req.body;
    if (!number) {
        return res.status(400).json({
            error: 'Missing fields in request body',
        });
    }
    try {
        const screen = await prisma.screen.create({
            data: {
                number,
            },
        });

        const updatedScreen = await prisma.screen.update({
            where: {
                id: screen.id,
            },
            data: {
                screenings: {
                    create: screenings,
                },
            },
            include: {
                screenings: true,
            },
        });
        res.status(201).json({ screen: updatedScreen });
    } catch (e) {
        if (e.code === 'P2002') {
            return res.status(409).json({
                error: 'Screen with that number already exists',
            });
        }
        res.status(500).json({ error: e.message });
    }
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
