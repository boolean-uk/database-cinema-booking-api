const { error } = require("console")
const { getCustomerByID } = require("../domains/customer")
const { findScreeningById } = require("../domains/screen")
const { createTicket } = require("../../test/helpers/createTicket.js")
const { PrismaClientKnownRequestError } = require("@prisma/client/runtime/library")

const createTicketController = async (req, res) => {

    const {screeningId, customerId} = req.body
    const foundScreenId = await findScreeningById(screeningId)
    const foundCustomerId =  await getCustomerByID(customerId)
    
    if (!screeningId || !customerId) {
        return res.status(400).json({
            error: "Missing fields from the ticket"
        })
    }
    if (!foundScreenId || !foundCustomerId) {
        return res.status(404).json({
            error: "The screen or customer does not exist, please select another ID"
        })
    }
    try {
        const createdTicket = await createTicket(screeningId, customerId)
        res.status(201).json({
        ticket: createdTicket
    })
    } catch (e) {
        if(e instanceof PrismaClientKnownRequestError) {
            if(e.code === "P2001") {
                return res.status(404).json({
                    error: "The screen or customer does not exist, please select another ID"
                })
            }
        }
        res.status(500).json({
            error: e.message
        })
    }
    
}

module.exports = {
    createTicketController
}