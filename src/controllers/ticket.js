const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");
const {
  errorMessages,
  checkFields,
  findScreenById,
  findMovieById,
} = require("./utils");

const createTicket = async (req, res) => {
  const { screeningId, customerId } = req.body;
  if (checkFields([screeningId, customerId])) {
    return res.status(400).json({ error: errorMessages.missingField });
  }

  try {
    const ticket = await prisma.ticket.create({
      data: { screeningId, customerId },
      include: {
        screening: true,
        customer: true,
      },
    });

    const thisScreen = await findScreenById(ticket.screening.screenId);
    const thisMovie = await findMovieById(ticket.screening.movieId);
    console.log("thisScreen", thisScreen);
    console.log("thisMovie", thisMovie);
    ticket.screen = thisScreen;
    ticket.movie = thisMovie;

    res.status(201).json({ ticket });
  } catch (err) {
    console.log(err);
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2003") {
        return res
          .status(404)
          .json({ error: errorMessages.ticketForeignNotExists });
      }
    }
  }
};

module.exports = { createTicket };
