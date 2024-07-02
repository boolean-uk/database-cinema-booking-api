const BadRequest = require("../errors/BadRequest")
const Conflict = require("../errors/Conflict")
const NotFound = require("../errors/NotFound")
const prisma = require("../utils/prisma")

const getAllMoviesDb = async (runtimeLt, runtimeGt) => {
  let whereClause = {}

  if (runtimeLt || runtimeGt) {
    whereClause = {
      OR: [],
    }
  }

  if (runtimeLt) {
    whereClause.OR.push({
      runtimeMins: {
        lt: runtimeLt,
      },
    })
  }

  if (runtimeGt) {
    whereClause.OR.push({
      runtimeMins: {
        gt: runtimeGt,
      },
    })
  }

  const movies = await prisma.movie.findMany({
    where: whereClause,
    include: {
      screenings: true,
    },
  })

  const moviesWithScreenings = movies.filter(movie => movie.screenings.length >= 1)

  return moviesWithScreenings
}

const createMovieDb = async (title, runtimeMins, screenings) => {
  if (!title || !runtimeMins) {
    throw new BadRequest("Missing fields in request body")
  }

  const existingTitle = await prisma.movie.findFirst({
    where: {
      title: title,
    },
  })

  if (existingTitle) {
    throw new Conflict("A movie with the provided title already exists")
  }

  let dataClause = {
    title: title,
    runtimeMins: runtimeMins,
  }

  if (screenings) {
    const { screenId, startsAt } = screenings[screenings.length - 1]

    if (!screenId || !startsAt) {
      throw new BadRequest("Missing fields in request body")
    }

    dataClause = {
      title: title,
      runtimeMins: runtimeMins,
      screenings: {
        create: [
          {
            screenId: screenId,
            startsAt: startsAt,
          },
        ],
      },
    }
  }

  return await prisma.movie.create({
    data: dataClause,
    include: {
      screenings: true,
    },
  })
}

const getMovieByIdOrTitleDb = async (id, title) => {
  const movie = await prisma.movie.findFirst({
    where: {
      OR: [
        {
          id: id,
        },
        {
          title: {
            equals: title,
            mode: "insensitive",
          },
        },
      ],
    },
    include: {
      screenings: true,
    },
  })

  if (!movie) {
    throw new NotFound("Movie with that id or title does not exist")
  }

  return movie
}

const updateMovieDb = async (paramsId, title, runtimeMins, screenings) => {
  const movie = await prisma.movie.findUnique({
    where: {
      id: paramsId,
    },
  })

  if (!movie) {
    throw new NotFound("Movie with that id does not exist")
  }

  if (!title || !runtimeMins) {
    throw new BadRequest("Missing fields in the request body")
  }

  const existingTitle = await prisma.movie.findFirst({
    where: {
      title: title,
    },
  })

  if (existingTitle) {
    throw new Conflict("Movie with that title already exists")
  }

  let dataClause = {
    title: title,
    runtimeMins: runtimeMins,
  }

  if (screenings) {
    const { screenId, startsAt, id } = screenings[screenings.length - 1]

    if (!screenId || !startsAt || !id) {
      throw new BadRequest("Missing fields in the request body")
    }

    dataClause.screenings = {
      update: [
        {
          where: {
            id: id,
          },
          data: {
            screenId: screenId,
            startsAt: startsAt,
          },
        },
      ],
    }
  }

  return await prisma.movie.update({
    where: {
      id: paramsId,
    },
    data: dataClause,
    include: {
      screenings: true,
    },
  })
}

module.exports = {
  getAllMoviesDb,
  createMovieDb,
  getMovieByIdOrTitleDb,
  updateMovieDb,
}
