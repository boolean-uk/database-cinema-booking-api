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
    try {
        const movies = await prisma.movie.findMany({
            include: { screenings: true }
        })
        res.status(200).json({ movies });
    } catch (error) {
        return getErorCode(error, res)
    }
}
const createMovie = async (req, res) => {
    const { title, runtimeMins } = req.body;
    if (!title || runtimeMins === null || undefined) {
        return res.status(400).json({
            error: "Missing fields in request body"
        })
    }
    try{
        const createMovie = await prisma.movie.create({
            data:{
                title,
                runtimeMins:Number(runtimeMins),
            },
            include:{screenings:true}
        });
        
        res.status(201).json({movie:createMovie})
    }catch(error){
        return getErorCode(error,res);
    }
}
const getMovieById = async (req, res) => {
    const { id } = req.params;
    try {
        const movie = await prisma.movie.findUnique({
            where: {
                id: Number(id)
            },
            include:{screenings:true}
        });
        res.status(200).json({movie});
    } catch (error) {
        console.log({ error });
    }
}
const updateMovieById = async(req, res) => {
    const { id } = req.params;
    const { title, runtimeMins } = req.body;
    if (!title || runtimeMins === null || undefined) {
        return res.status(400).json({
            error: "Missing fields in request body"
        })
    }
    try{
        const updateMovie = await prisma.movie.update({
            where: { id: Number(id) },
            data: {title,runtimeMins: Number(runtimeMins)},
            include:{ screenings: true}
        })
        return res.status(201).json({movie:updateMovie})
    }catch (error) {
        return getErorCode(error,res);
    }
}
module.exports = {
    getAllMovies,
    createMovie,
    getMovieById,
    updateMovieById
}