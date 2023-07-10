const { Prisma } = require('@prisma/client')
const prisma = require('../utils/prisma')

const createTicket = async (req, res) => {
  const { screeningId, customerId } = req.body
  if (!screeningId && !customerId) {
    return res.status(400).json({
      error: 'Missing fields in request body'
    })
  } else {
    const findCustomer = await prisma.customer.findFirst({
      where: { id: customerId }
    })
    if (!findCustomer) {
      return res.status(404).json({
        error: 'A customer with that id does not exist'
      })
    } else {
      const ticket = await prisma.ticket.create({
        data: {
          screeningId,
          customerId
        },
        include: {
          customer: { include: { contact: true } },
          screening: {
            include: {
              movie: true,
              screen: true
            }
          }
        }
      })
      res.status(201).json({ ticket: ticket })
    }
  }
}
module.exports = {
  createTicket
}
