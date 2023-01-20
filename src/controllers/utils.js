const prisma = require("../utils/prisma");

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

const convertScreeningsTime = (screenings) => {
  for (const screening in screenings) {
    screening.startsAt = new Date(screening.startsAt);
  }
};
const buildScreenData = (
  reqBody
  // actionType, id = null
) => {
  const { title, runtimeMins, screenings } = reqBody;
  let movieData = { title, runtimeMins };
  if (screenings) {
    convertScreeningsTime(screenings);
    // if (actionType === "create") {
    movieData = { ...movieData, screenings: { create: screenings } };
  }
  return movieData;
};

module.exports = {
  buildRuntimeClause,
  buildScreenData,
};
