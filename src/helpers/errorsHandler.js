const errorCreator = (message, status) => {
  const error = new Error(message)
  error.status = status
  return error
}

const fieldsErrorHandler = (fields) => {
  fields.forEach((field) => {
    console.log(field)
    if (!field) {
      throw errorCreator('Missing fields in request body', 400)
    }
  })
}

module.exports = {
  errorCreator,
  fieldsErrorHandler
}
