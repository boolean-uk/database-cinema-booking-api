const { Prisma } = require("@prisma/client")
const prisma = require('../utils/prisma')

// const createCustomer = async (req, res) => {
//     const {
//         name,
//         phone,
//         email
//     } = req.body

//     if (!name || !phone || !email) {
//         return res.status(400).json({
//             error: "Missing fields in request body"
//         })
//     }

//     try {
//         /**
//          * This will create a Customer AND create a new Contact, then automatically relate them with each other
//          * @tutorial https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#create-a-related-record
//          */
//         const createdCustomer = await prisma.customer.create({
//             data: {
//                 name,
//                 contact: {
//                     create: {
//                         phone,
//                         email
//                     }
//                 }
//             },
//             // We add an `include` outside of the `data` object to make sure the new contact is returned in the result
//             // This is like doing RETURNING in SQL
//             include: { 
//                 contact: true
//             }
//         })

//         res.status(201).json({ customer: createdCustomer })
//     } catch (e) {
//         if (e instanceof Prisma.PrismaClientKnownRequestError) {
//             if (e.code === "P2002") {
//                 return res.status(409).json({ error: "A customer with the provided email already exists" })
//             }
//         }
        
//         res.status(500).json({ error: e.message })
//     }
// }

const getAllMovies = async (req, res) => {
    // console.log(req.query.runtimeLt)
    let movies
    if (req.query.runtimeLt || req.query.runtimeGt) {
        movies = await prisma.movie.findMany({
            where: {
                AND: [
                    {
                      runtimeMins: {
                        lt: Number(req.query.runtimeLt) || undefined
                      }
                    },
                    {
                      runtimeMins: {
                        gt: Number(req.query.runtimeGt) || undefined
                      }
                    }
                ]
            },
            include: {
                screenings: true
            }
        })
    } else {
        movies = await prisma.movie.findMany({
            include: {
                screenings: true
            }
        })
    }
    res.status(200).json({ movies })
}

const createMovie = async (req, res) => {
    const { title, runtimeMins, screenings } = req.body
    // console.log('SCREENINGS', screenings)
    if (!title || !runtimeMins) {
        res.status(400).json({ error: "Missing fields in request body"})
    }

    try {
        const movie = await prisma.movie.create({
            data: {
                title,
                runtimeMins,
                screenings: {
                    create: screenings,
                },
            },
            include: {
                screenings: true
            }
        })
        res.status(201).json({ movie })
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError){
            if (e.code === "P2002") {
                return res.status(409).json({ error: "A movie with the provided title already exists" })
            }
        }
        console.log(e.message)
        res.status(500).json({ error: e.message})
    }
}

const getMovieById = async (req, res) => {
    const param = req.params.id

    try {
        const movie = await prisma.movie.findUnique({
            where: {
                id: isNaN(param) ? undefined : Number(param),
                title: !isNaN(param) ? undefined : param
            },
            include: {
                screenings: true
            }
        })
        res.status(200).json({ movie })
    } catch (e) {
        console.log(e.code)
        if (e instanceof Prisma.PrismaClientKnownRequestError){
            if (e.code === "P2001") {
                return res.status(404).json({ error: "Movie with that id or title does not exist" })
            }
        }
        res.status(500).json({ error: e.message})
    }
}

const updateMovieById = async (req, res) => {
    const param = req.params.id
    const { title, runtimeMins, screenings } = req.body

    if (!title || !runtimeMins) {
        res.status(400).json({ error: "Missing fields in request body"})
    }

    try {
        const movie = await prisma.movie.update({
            where: {
                id: isNaN(param) ? undefined : Number(param),
                title: !isNaN(param) ? undefined : param
            },
            data: {
                title,
                runtimeMins
            },
            include: {
                screenings: true
            }
        })
        res.status(201).json({ movie })
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError){
            if (e.code === "P2002") {
                return res.status(409).json({ error: "Movie with the provided title already exists" })
            } else if (e.code === "P2001") {
                return res.status(404).json({ error: "Movie with that id or title does not exist" })
            }
        }
        console.log(e.message)
        res.status(500).json({ error: e.message})
    }
}

module.exports = {
    getAllMovies,
    createMovie,
    getMovieById,
    updateMovieById
}
