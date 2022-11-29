const { Prisma } = require("@prisma/client")
const prisma = require('../utils/prisma')

const createMovie = async (req, res) => {
    const { title, runtimeMins } = req.body;
    if (!title || !runtimeMins) {
        return res.status(400).json({
            error: "Missing fields in request body"
        })
    }
    try {
        const createdMovie = await prisma.movie.create({
            data: {
                title, runtimeMins, screenings: {
                    create: [screenings],
                },
            },
            include: { screenings: true },
        })

        res.status(201).json({ movie: createdMovie })
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

// const getAllMovies = async (req, res) => {
//     const movies = await prisma.movie.
//         res.status(200).json({ movies })
// }

// const getMovieById = async (req, res) => {
//     const id = Number(req.params.id)

//     return res.status(200).json({ movie })
// }

// const updateMovie = async (req, res) => {
//     const id = Number(req.params.id)
//     const { title, runtimeMins, screenings } = req.body

//     res.status(201).json({ movie })
// }



module.exports = { createScreen }
