const { Prisma } = require('@prisma/client');
const prisma = require('../utils/prisma');
const getErorCode = (e, res) => {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
            return res.status(409).json({ error: "A movie with the provided field already exists" })
        } else if (e.code === "P2025") {
            return res.status(404).json({ error: "A movie with the provided id does not exists!" })
        }
    }
    res.status(500).json({ error: e.code + " " + e.message })
}
const getAllMovies = async (req, res) => {

    const { runtimeLt, runtimeGt } = req.query;
    let query = { include: { screenings: true } };

    if (runtimeLt && runtimeGt) {
        query = {
            where: {
                runtimeMins: {
                    gte: Number(runtimeGt),
                    lte: Number(runtimeLt)
                }
            },
            include: { screenings: true }
        }
    }

    try {
        const movies = await prisma.movie.findMany(query);
        res.status(200).json({ movies });
    } catch (error) {
        return getErorCode(error, res)
    }
}
const updateWithRelationValues = (req, upid) => {
    const { title, runtimeMins, screenings } = req.body;
    let id = 0;
    const mappedScreen = screenings.map((screen) => {

        const { movieId, screenId, startsAt } = screen;
        if (screen.screeningsId) {
            id = screen.screeningsId;
        }
        console.log({ screen });
        return {
            create: {
                startsAt: new Date(startsAt),
                screen: {
                    connect: {
                        id: Number(screenId)
                    }
                }
            },
            where: { id: Number(id) }
        }
    })
    return {
        where: { id: Number(upid) },
        create: {
            title,
            runtimeMins: Number(runtimeMins),
            screenings: {
                connectOrCreate: mappedScreen
            }
        },
        update: {
            title,
            runtimeMins: Number(runtimeMins),
            screenings: {
                connectOrCreate: mappedScreen
            }
        },
        include: { screenings: true }
    }
}
const createWithRelationValues = (req) => {
    const { title, runtimeMins, screenings } = req.body;
    if (screenings) {
        const mappedScreen = screenings.map((screen) => {
            const { movieId, screenId, startsAt } = screen;
            console.log({ screen });
            return {
                startsAt: new Date(startsAt),
                screen: {
                    connect: {
                        id: Number(screenId)
                    }
                }
            }
        })
        return {
            title,
            runtimeMins: Number(runtimeMins),
            screenings: {
                create: mappedScreen,
            }
        }
    }

    return req.body;
}
const createMovie = async (req, res) => {
    const { title, runtimeMins } = req.body;
    if (!title || runtimeMins === null || undefined) {
        return res.status(400).json({
            error: "Missing fields in request body"
        })
    }
    try {
        const createMovie = await prisma.movie.create({
            data: createWithRelationValues(req),
            include: { screenings: true }
        });

        res.status(201).json({ movie: createMovie })
    } catch (error) {
        console.log({ error });
        return getErorCode(error, res);
    }
}
const getMovieById = async (req, res) => {
    const { id } = req.params;
    try {
        const movie = await prisma.movie.findUnique({
            where: {
                id: Number(id)
            },
            include: { screenings: true }
        });
        res.status(200).json({ movie });
    } catch (error) {
        console.log({ error });
    }
}
const updateMovieById = async (req, res) => {
    const { id } = req.params;
    const { title, runtimeMins, screenings } = req.body;
    if (!title || runtimeMins === null || undefined) {
        return res.status(400).json({
            error: "Missing fields in request body"
        })
    }
    try {
        let updateMovie;
        if(screenings){
            updateMovie = await prisma.movie.upsert(updateWithRelationValues(req, id))
        }else{
            updateMovie = await prisma.movie.update({
                where: { id: Number(id) },
                data: {title,runtimeMins: Number(runtimeMins)},
                include:{ screenings: true}
            })
        }
        return res.status(201).json({ movie: updateMovie })
    } catch (error) {
        console.log({ error });
        return getErorCode(error, res);
    }
}
module.exports = {
    getAllMovies,
    createMovie,
    getMovieById,
    updateMovieById
}