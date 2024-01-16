const {
  Prisma: { PrismaClientKnownRequestError },
} = require("@prisma/client");

const Types = require("../utils/types.d.js");

const errorCodes = {
  P2002: uniqueConstraintFailed,
};

/**
 * @param {Error} error
 * @param {Types.Response} res
 * @returns {void}
 */
function handleError(error, res) {
  if (error instanceof PrismaClientKnownRequestError) {
    const errorHandler = errorCodes[error.code];
    if (errorHandler) {
      errorHandler(error, res);
      return;
    }
  }

  res.status(500).json({ error: error.message });
}

/**
 * @param {import("@prisma/client").Prisma.PrismaClientKnownRequestError} error
 * @param {Types.Response} res
 * @returns {void}
 */
function uniqueConstraintFailed(error, res) {
  let errorMessage = error.message;
  if (error.meta && typeof error.meta.modelName === "string") {
    const model = error.meta.modelName.toLowerCase();
    const target = error.meta.target;
    errorMessage = `A ${model} with the provided ${target} already exists`;
  }

  res.status(409).json({ error: errorMessage });
}

module.exports = handleError;
