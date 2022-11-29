class MissingFieldsError extends Error {
  message = "Missing fields in request body";
  code = 400;
}

module.exports = { MissingFieldsError };
