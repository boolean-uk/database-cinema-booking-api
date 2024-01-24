const { PrismaClientKnownRequestError } = require("@prisma/client/runtime/library.js");

const { createTicketDB } = require("../domains/ticket.js");

const createTicket = async (req, res) => {
    const { screeningId, customerId } = req.body;

    if (!screeningId || !customerId) {
        res.status(400).json({
            error: `Missing fields in request body`,
        });
    }

    try {
        const newTicket = await createTicketDB(screeningId, customerId);
        res.status(201).json({ ticket: newTicket });

    } catch (err) {
        if (err instanceof PrismaClientKnownRequestError) {
            if (err.code === "P2002") {
                return res.status(409).json({
                    error: `A customer or screening does not exist with the provided id`,
                });
            }
        }
        
        console.log(err.message);
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createTicket,
};
