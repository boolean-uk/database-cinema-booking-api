const { Prisma } = require('@prisma/client');
const prisma = require('../utils/prisma');
const getErorCode = (e, res) => {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
            return res.status(409).json({ error: "A ticket with the provided field already exists" })
        } else if (e.code === "P2025") {
            return res.status(404).json({ error: "A ticket with the provided id does not exists!" })
        }
    }
    res.status(500).json({ error: e.code + " " + e.message })
}
const getAllTicket = async (req, res) => {
    try {
        const ticket = await prisma.ticket.findMany({
            include: {
                screening: true,
                customer: true
            }
        })
        res.status(200).json({ ticket });
    } catch (error) {
        console.log({ error });
        return getErorCode(error, res)
    }
}
const createTicket = async (req, res) => {
    const { screeningId, customerId } = req.body;
    if (!screeningId || !customerId) {
        return res.status(400).json({
            error: "Missing fields in request body"
        })
    }
    try {
        const createdticket = await prisma.ticket.create({
            data: {
                screeningId,
                customerId
            },
            include: {
                screening: {
                    include: {
                        screen: true,
                        movie: true
                    }
                },
                customer: true,

            }
        });

        res.status(201).json({ ticket: createdticket })
    } catch (error) {
        console.log({ error });
    }
}
const getTicketById = async (req, res) => {
    const { id } = req.params;
    try {
        const ticket = await prisma.ticket.findUnique({
            where: {
                id: Number(id)
            },
            include: { ticketings: true }
        });
        res.status(200).json({ ticket });
    } catch (error) {
        return getErorCode(error, res);
    }
}
module.exports = {
    getAllTicket,
    createTicket,
    getTicketById
}