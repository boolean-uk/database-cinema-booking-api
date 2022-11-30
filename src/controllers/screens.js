const { Prisma } = require("@prisma/client")
const prisma = require('../utils/prisma')

const createScreen = async (req, res) => {
    const { number } = req.body;

    if (!number) {
        return res.status(400).json({
            error: "Missing fields in request body"
        })
    }

    try {
        const createdScreens = await prisma.screens.create({
            data: { number: number }
        })
        res.status(201).json({ screen: createdScreens })
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

module.exports = { createScreen }
