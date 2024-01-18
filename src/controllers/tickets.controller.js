const { createTicket } = require("../domains/tickets.domain.js");
const handleError = require("../utils/error.js");
const { ticket } = require("../utils/prisma.js");

const Types = require("../utils/types.d.js");

/**
 * @param {Types.Request} req
 * @param {Types.Response} res
 * @returns {Promise<void>}
 */
async function postTicket(req, res) {
  const { screeningId, customerId } = req.body;

  try {
    const newTicket = await createTicket(screeningId, customerId);
    /**
     * @type {Object} 
     */
    const ticketPayload = {
      screening: newTicket.screening,
      customer: newTicket.customer,
      screen: newTicket.screening.screen,
      movie: newTicket.screening.movie,
    };
    delete ticketPayload.screening.screen
    delete ticketPayload.screening.movie
    res.status(201).json({ ticket: ticketPayload });
  } catch (error) {
    handleError(error, res);
    return;
  }
}

module.exports = {
  postTicket,
};
