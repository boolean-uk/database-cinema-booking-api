const { Prisma } = require("@prisma/client")
const prisma = require('../utils/prisma');
const { query } = require("express");

const createScreen = async (req, res) => {
    const {number} = req.body
    const result = await prisma.screen.create({
        data: {
            number
        }
    })
    res.status(201).send({screen: result})
}

module.exports = {
    createScreen
}