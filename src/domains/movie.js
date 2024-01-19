const prisma = require("../utils/prisma");


const getAllMoviesDb = async ( runtimeGt, runtimeLt ) => {

    const movies = await prisma.movie.findMany({
        where: {
            runtimeMins: {
                ...(runtimeGt !== undefined ? {gt: Number(runtimeGt)} : {}),
                ...(runtimeLt !== undefined ? {lt: Number(runtimeLt)} : {})
            }
        },
        include: {
            screenings: true
        }
    });
    return movies
};


const createMovieDb = async (title, runtimeMins) => {
    const newMovie = await prisma.movie.create({
        data: {
            title: title,
            runtimeMins: runtimeMins
        },
        include: {
            screenings: true
        }
    })

    return newMovie
}


const createMovieWithScreeningDb = async (title, runtimeMins, screenings) => {
    const newMovieWithScreening = await prisma.movie.create({
        data: {
            title: title,
            runtimeMins: runtimeMins,
            screenings: {
                create: screenings
            }
        }, 
        include: {
            screenings: true
        }
    });

    return newMovieWithScreening;
};

const getMovieByIdDb = async (id) => {
    const movie = await prisma.movie.findUnique({
        where: {
            id: id
        },
        include: {
            screenings: true
        }
    });

    return movie;
};



const updateMovieByIdDb = async (id, title, runtimeMins) => {
    console.log(title, runtimeMins)
    const updatemovie = await prisma.movie.update({
        where: {
            id: id
        },
        data: {
            title: title,
            runtimeMins: runtimeMins
        },
        include: {
            screenings: true
        }
    });

    return updatemovie;
};



// const updateMovieByIdWithScreeningDb = async (id, title, runtimeMins, screenings) => {
//     const updatedMovieWithScreening = await prisma.movie.update({
//         where: {
//             id: id
//         },
//         data: {
//             title: title,
//             runtimeMins: runtimeMins,
//             screenings: {
//                 create: screenings
//             }
//         },
//         include: {
//             screenings: true
//         }
//     });
//     return updatedMovieWithScreening;
// };




module.exports = {
    getAllMoviesDb,
    createMovieDb,
    createMovieWithScreeningDb,
    getMovieByIdDb,
    updateMovieByIdDb,
    // updateMovieByIdWithScreeningDb
};