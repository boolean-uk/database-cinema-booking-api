const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const getAll = async (req, res) => {
  const getAll = await prisma.ticket.findMany();
  res.json({ tickets: getAll });
};

const createTicket = async (req, res) => {
  const { screeningId, customerId } = req.body;
  if (!screeningId || !customerId) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  } else {
    const findCustomer = await prisma.customer.findFirst({
      where: { id: customerId },
    });
    if(!findCustomer){
        return res.status(404).json({
            error: "Customer with that id does not exist",
          });
    }
    else{
        const createTicket = await prisma.ticket.create({
            data: {
              screeningId,
              customerId,
            },
            include: {
              screening: true,
              customer: { include: { contact: true } },
              screening: {
                include: {
                  movie: true,
                  screen: true,
                },
              },
            },
          });
          res.status(201).json({ ticket: createTicket });
        }
    }
   
};

module.exports = {
  createTicket,
  getAll,
};
