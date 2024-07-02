const { getCustomerByID } = require("../domains/customer")
const { findScreen } = require("../domains/screen")
const { createTicket } = require("../domains/ticket")

const createTicketController = async (req, res) => {
    const customerID = req.body.customerId
    if (
        req.body.screeningId === "" ||
        req.body.screeningId === undefined ||
        req.body.customerId === "" ||
        req.body.customerId === undefined
    ) {
        throw new MissingFields("Missing fields from the ticket")
    }
    if (!findScreen() || !getCustomerByID(customerID)) {
        throw new DoesNotExist("The screen or customer does not exist, please select another ID")
    }
    const createdTicket = await createTicket(req)
    res.status(201).json({
        ticket: createdTicket
    })
}

module.exports = {
    createTicketController
}