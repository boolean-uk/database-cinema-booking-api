const { locateCustomerByIdDb } = require("../domains/customer");
const { locateShowingByIdDb } = require("../domains/screening");
const { generateTicketDb } = require("../domains/tickets");

// Getting tickets - creating the ticket

const generateTicket = async (req, res) => {
  try {
    const { screeningId, customerId } = req.body;

    if (!screeningId || !customerId) {
      return res
        .status(400)
        .send({ error: "Incomplete fields in the request body" });
    }

    const foundPatron = await locateCustomerByIdDb(customerId);
    const locatedScreening = await locateShowingByIdDb(screeningId);

    if (!locatedScreening || !foundPatron) {
      return res.status(404).send({
        error: "A customer or screening does not exist with the provided ID",
      });
    }

    const issuedTicket = await generateTicketDb(screeningId, customerId);

    return res.status(201).send({ ticket: issuedTicket });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  generateTicket,
};
