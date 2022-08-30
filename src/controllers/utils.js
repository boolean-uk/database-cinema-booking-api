const errorMessages = {
  missingField: "Missing field in request body",
  movieExists: "A movie with the provided title already exists",
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

module.exports = { errorMessages, buildRuntimeClause };
