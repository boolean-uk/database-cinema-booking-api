const BadRequest = require("../errors/BadRequest")
const Conflict = require("../errors/Conflict")
const prisma = require("../utils/prisma")

const createSceenDb = async (number, screenings) => {
  if (!number) {
    throw new BadRequest("Missing fields in the request body")
  }

  const screen = await prisma.screen.findFirst({
    where: {
      number: number,
    },
  })

  if (screen) {
    throw new Conflict("A screen with the provided number already exists")
  }

  let dataClause = {
    number: number,
  }

  if (screenings) {
    const { movieId, startsAt } = screenings[screenings.length - 1]

    if (!movieId || !startsAt) {
      throw new BadRequest("Missing fields in the request body")
    }

    dataClause.screenings = {
      create: [
        {
          movieId: movieId,
          startsAt: startsAt,
        },
      ],
    }
  }

  return await prisma.screen.create({
    data: dataClause,
    include: {
      screenings: true,
    },
  })
}

module.exports = createSceenDb
