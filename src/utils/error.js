const {
  Prisma: { PrismaClientKnownRequestError },
} = require("@prisma/client");

const Types = require("../utils/types.d.js");

const errorCodes = {
  P2002: uniqueConstraintFailed,
  P2003: foreignKeyConstraintFailed,
  P2025: recordNotFound,
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

/**
 * @param {import("@prisma/client").Prisma.PrismaClientKnownRequestError} error
 * @param {Types.Response} res
 * @returns {void}
 */
function foreignKeyConstraintFailed(error, res) {
  let errorMessage = error.message
  if (error.meta && typeof error.meta.modelName === "string" && typeof error.meta.field_name === "string") {
    const fieldName = error.meta.field_name.split("_")[1]
    errorMessage = `Provided ${fieldName} does not exist`;
  }
  res.status(404).json({error: errorMessage})
}

/**
 * @param {import("@prisma/client").Prisma.PrismaClientKnownRequestError} error
 * @param {Types.Response} res
 * @returns {void}
 */
function recordNotFound(error, res) {
  let errorMessage = error.message;
  if (error.meta && typeof error.meta.modelName === "string") {
    const model = error.meta.modelName;
    errorMessage = `${model} id not found.`;
  }

  res.status(404).json({ error: errorMessage });
}

module.exports = handleError;
