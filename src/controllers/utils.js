const prisma = require("../utils/prisma");

const errorMessages = {
  missingField: "Missing field in request body",
  movieExists: "A movie with the provided title already exists",
  movieNotExists: "Movie with that id or title does not exist",
  customerNotExists: "Customer with that id does not exist",
  screenExists: "A screen with the provided number already exists",
  ticketForeignNotExists:
    "A customer or screening does not exist with the provided id",
};

const buildRuntimeClause = (queries, base) => {
  const { runtimeMinsLt, runtimeMinsGt } = queries;

  if (runtimeMinsLt && runtimeMinsGt) {
    return {
      where: {
        runtimeMins: {
          gt: Number(runtimeMinsGt),
          lt: Number(runtimeMinsLt),
        },
      },
      ...base,
    };
  } else if (runtimeMinsLt) {
    return {
      where: {
        runtimeMins: {
          lt: Number(runtimeMinsLt),
        },
      },
      ...base,
    };
  } else if (runtimeMinsGt) {
    return {
      where: {
        runtimeMins: {
          gt: Number(runtimeMinsGt),
        },
      },
      ...base,
    };
  } else {
    return base;
  }
};

const checkFields = (params) => {
  const missingField = params.filter((param) => !param);
  return missingField.length;
};

const convertScreeningsTime = (screenings) => {
  for (const screening in screenings) {
    screening.startsAt = new Date(screening.startsAt);
  }
};

const buildCreateMovieData = (
  reqBody
  // actionType, id = null
) => {
  const { title, runtimeMins, screenings } = reqBody;
  let movieData = { title, runtimeMins };
  if (screenings) {
    convertScreeningsTime(screenings);
    // if (actionType === "create") {
    movieData = { ...movieData, screenings: { create: screenings } };
    // }
    // else if (actionType === "update") {
    //   movieData = {
    //     ...movieData,
    //     screenings: {
    //       update: screenings,
    //     },
    //   };
    // }
  }
  return movieData;
};

const updateMovieScreenings = async (screenings, movieId) => {
  convertScreeningsTime(screenings);

  for (let i = 0; i < screenings.length; i++) {
    const screening = screenings[i];
    console.log(screening);

    if (screening.id) {
      console.log("startsAt: ", screening.startsAt);
      await prisma.screening.update({
        where: { id: screening.id },
        data: {
          screenId: screening.screenId,
          startsAt: screening.startsAt,
        },
      });
    } else {
      await prisma.screening.create({
        data: {
          movieId: movieId,
          screenId: screening.screenId,
          startsAt: screening.startsAt,
        },
      });
    }
  }
};

const buildCustomerUpdateData = (reqBody) => {
  const { name, contact } = reqBody;
  let customerData = { name };
  if (contact) {
    customerData = { name, contact: { update: contact } };
  }
  return customerData;
};

const buildScreenData = (reqBody) => {
  const { number, screenings } = reqBody;
  let screenData = { number };
  if (screenings) {
    convertScreeningsTime(screenings);
    screenData = { ...screenData, screenings: { create: screenings } };
  }
  return screenData;
};

const findScreenById = async (id) => {
  return await prisma.screen.findUnique({
    where: { id },
  });
};

const findMovieById = async (id) => {
  return await prisma.movie.findUnique({
    where: { id },
  });
};

module.exports = {
  errorMessages,
  buildRuntimeClause,
  checkFields,
  buildCreateMovieData,
  updateMovieScreenings,
  buildCustomerUpdateData,
  buildScreenData,
  findScreenById,
  findMovieById,
};
