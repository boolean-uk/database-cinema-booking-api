const errorMessages = {
  missingField: "Missing field in request body",
  movieExists: "A movie with the provided title already exists",
  movieNotExists: "Movie with that id or title does not exist",
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

const buildMovieData = (data) => {
  const { title, runtimeMins, screenings } = data;
  let movieData = { title, runtimeMins };
  if (screenings) {
    for (const screening in screenings) {
      screening.startsAt = new Date(screening.startsAt);
    }
    movieData = { ...movieData, screenings: { create: screenings } };
  }
  return movieData;
};

module.exports = { errorMessages, buildRuntimeClause, buildMovieData };
