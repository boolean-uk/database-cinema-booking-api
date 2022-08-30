const { Prisma } = require('@prisma/client');
const prisma = require('../utils/prisma');
const getErorCode = (e, res) => {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
            return res.status(409).json({ error: "A screen with the provided field already exists" })
        } else if (e.code === "P2025") {
            return res.status(400).json({ error: "A screen with the provided id does not exists!" })
        }
    }
    res.status(500).json({ error: e.code + " " + e.message })
}
const getAllScreen = async (req, res) => {
    try {
        const screen = await prisma.screen.findMany({
            include: { screenings: true }
        })
        res.status(200).json({ screen });
    } catch (error) {
        return getErorCode(error, res)
    }
}
const createScreen = async (req, res) => {
    const { number } = req.body;
    if (!number) {
        return res.status(400).json({
            error: "Missing fields in request body"
        })
    }
    try{
        const createScreen = await prisma.screen.create({
            data:{
                number
            },
            include:{screenings:true}
        });
        
        res.status(201).json({screen:createScreen})
    }catch(error){
       console.log({error});
    }
}
const getScreenById = async (req, res) => {
    const { id } = req.params;
    try {
        const screen = await prisma.screen.findUnique({
            where: {
                id: Number(id)
            },
            include:{screenings:true}
        });
        res.status(200).json({screen});
    } catch (error) {
        return getErorCode(error,res);
    }
}
module.exports = {
    getAllScreen,
    createScreen,
    getScreenById
}