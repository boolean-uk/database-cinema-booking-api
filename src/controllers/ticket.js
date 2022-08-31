const { Prisma } = require("@prisma/client")
const prisma = require('../utils/prisma')

const createTicket = async (req, res) => {
  const { screeningId, customerId } = req.body

  if (!screeningId || !customerId) return res.status(400).json({ error: 'Missing fields in the request body' })
    const customer = await prisma.customer.findUnique({
      where: {
        id: customerId
      }
    })

    const screening = await prisma.screening.findUnique({
      where: {
        id: screeningId
      }
    })

    const screen = await prisma.screen.findUnique({
      where: {
        id: screening.screenId
      }
    })

    const movie = await prisma.movie.findUnique({
      where: {
        id: screening.movieId
      }
    })

    const contact = await prisma.contact.findUnique({
      where: {
        customerId: customer.id
      }
    })

    if (!customer || !screening) return res.status(404).json({ error: 'A customer or screening does not exist with the provided Id'})

    // In the specs the contact is related to the customer, but on the seeds is the customer to be connected to the contact. Couldn't find a way to switch 
    // without messing with the seed.js code, so decided to include the contact

//     const createdTicket = await prisma.ticket.create({
//       data: {
//         screening,
//         customer,
//         contact,
//         screen,
//         movie
//       }
//     })

//     res.status(201).json({ ticket: createdTicket })
}

// Does not work at first approach, will try to get back at it

module.exports = {createTicket}